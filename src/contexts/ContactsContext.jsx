import { createContext, useContext, useEffect, useState } from "react";

const ContactsContext = createContext();
function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem("contacts")) || []
  );
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    setFilteredContacts(contacts);
  }, [contacts]);

  const handleSearchContact = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().trim().includes(value) ||
          contact.email.toLowerCase().trim().includes(value)
      )
    );
  };
  return (
    <ContactsContext.Provider
      value={{ filteredContacts, contacts, setContacts, handleSearchContact }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsProvider;

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) console.log("error");
  return context;
};
