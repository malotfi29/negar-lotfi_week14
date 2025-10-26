import Contact from "./Contact";
import styles from "./ContactsList.module.css";

function ContactsList({ filteredContacts, handlerDeletecontact,selectedContacts,setSelectedContacts,handlerEditcontact }) {
  return (
    <ul className={styles.contacts}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          handlerDeletecontact={handlerDeletecontact}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
          handlerEditcontact={handlerEditcontact}
        />
      ))}
    </ul>
  );
}

export default ContactsList;
