import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

export const ConversationContext = React.createContext();

export function useConversations() {
  return useContext(ConversationContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );
  const { contacts } = useContacts();

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  //   Format the list of Conversations by mapping through each conversation,
  const formattedConversations = conversations.map(conversation => {
    //   followed by each recipient within a conversation, (recipient = an id)
    const recipients = conversation.recipients.map(recipient => {
      //   to find match recipients with contacts based on ID
      const contact = contacts.find(contact => {
        return contact.id === recipient;
      });
      // Return a new object with the details of our conversation
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });
    return { ...conversation, recipients };
  });

  const value = {
    conversations: formattedConversations,
    createConversation,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}
