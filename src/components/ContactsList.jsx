import { useContacts } from "../contexts/ContactsContext";
import Contact from "./Contact";
import styles from "./ContactsList.module.css";

function ContactsList({}) {
  const { filteredContacts, contacts, setContacts } = useContacts();

  if (filteredContacts.length === 0) {
    return <p className={styles.noContacts}>مخاطبی وجود ندارد!</p>;
  }
  return (
    <ul className={styles.contacts}>
      {filteredContacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
}

export default ContactsList;
