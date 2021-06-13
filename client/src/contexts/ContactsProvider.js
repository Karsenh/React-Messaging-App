import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext();

export default function ContactsProvider({ children }) {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
