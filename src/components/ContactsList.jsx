import { useEffect, useState } from "react";
import { useContacts } from "../contexts/ContactsContext";
import Contact from "./Contact";
import styles from "./ContactsList.module.css";
import Loading from "./Loading";

function ContactsList({}) {
  const { contacts, filteredContacts } = useContacts();
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    setDisplayed(contacts);
  }, [contacts]);

  useEffect(() => {
    setDisplayed(filteredContacts);
  }, [filteredContacts]);

  return (
    <ul className={styles.contacts}>
      {!displayed && <p>مخاطبی وجود ندارد</p>}
      {displayed.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}

export default ContactsList;
