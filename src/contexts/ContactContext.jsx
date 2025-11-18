import { createContext, useContext, useState } from "react";
import { useContacts } from "./ContactsContext";

const ContactContext = createContext();

function ContactProvider({ children }) {
  const { contacts, setContacts } = useContacts();
  const [editContact, setEditContact] = useState({});
  const [selectedContacts, setSelectedContacts] = useState([]);

  const addHandler = (data) => {
    if (Object.keys(editContact).length > 0) {
      setContacts(
        contacts.map((c) => (c.id === editContact.id ? { ...c, ...data } : c))
      );
      setEditContact({})
    } else {
      const newContact = { ...data, id: Date.now() };

      setContacts((contacts) => [...contacts, newContact]);
    }
  };

  const handleDeleteContacts = () => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => !selectedContacts.includes(contact.id))
    );
    setSelectedContacts([]);
  };

  return (
    <ContactContext.Provider
      value={{
        addHandler,
        editContact,
        setEditContact,
        selectedContacts,
        setSelectedContacts,
        handleDeleteContacts,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export default ContactProvider;

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) console.log("error");
  return context;
};
