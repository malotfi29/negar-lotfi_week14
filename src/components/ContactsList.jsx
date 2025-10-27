import Contact from "./Contact";
import styles from "./ContactsList.module.css";

function ContactsList({
  filteredContacts,
  selectedContacts,
  setSelectedContacts,
  handlerEditcontact,
  openDeleteModal,
  setOpenDeleteModal,
}) {
  if (filteredContacts.length === 0) {
    return <p className={styles.noContacts}>مخاطبی وجود ندارد!</p>;
  }
  return (
    <ul className={styles.contacts}>
      {filteredContacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
          handlerEditcontact={handlerEditcontact}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      ))}
    </ul>
  );
}

export default ContactsList;
