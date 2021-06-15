import React, { useContext, useState } from 'react';
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
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  //   Format the list of Conversations by mapping through each conversation,
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        // followed by each recipient within a conversation, (recipient = an id)
        return contact.id === recipient; //   to find match recipients with contacts based on ID
      });
      const name = (contact && contact.name) || recipient; // Return a new object with the details of our conversation
      return { id: recipient, name };
    });
    const selected = index === selectedConversationIndex; // Check if our current index is equal to the selectedConversationIndex and return a bool if this is selected
    return { ...conversation, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    createConversation,
    selectConversationIndex: setSelectedConversationIndex,
  };

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
}
