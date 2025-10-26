import { useEffect, useState } from "react";
import ContactsList from "./components/ContactsList";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {
  const [alert, setAlert] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [editContact, setEditContact] = useState({});
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem("contacts")) || []
  );
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [contact, setContact] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    job: "",
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    setFilteredContacts(contacts);
  }, [contacts]);

  const addHandler = (e) => {
    e.preventDefault();

    if (!contact.name || !contact.email || !contact.phone || !contact.job) {
      setAlert("Please enter valid data!");

      return;
    }
    setAlert("");
    if (Object.keys(editContact).length > 0) {
      setContacts(
        contacts.map((c) =>
          c.id === editContact.id ? { ...c, ...contact } : c
        )
      );
      setEditContact({});
    } else {
      const newContact = { ...contact, id: Date.now() };

      setContacts((contacts) => [...contacts, newContact]);
    }
    setOpenModal(false);

    setContact({
      id: "",
      name: "",
      email: "",
      phone: "",
      job: "",
    });
  };

  const handlerDeletecontact = (id) => {
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(filteredContacts);
  };

  const handlerEditcontact = (contact) => {
    setOpenModal((is) => !is);
    setEditContact(contact);
  };

  const handleSearchContact = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().trim().includes(value)
      )
    );
  };

  const handleDeleteContacts = () => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => !selectedContacts.includes(contact.id))
    );
  };

  return (
    <>
      <Header
        setOpenModal={setOpenModal}
        handleSearchContact={handleSearchContact}
        handleDeleteContacts={handleDeleteContacts}
        setEditContact={setEditContact}
      >
        <Modal
          setContact={setContact}
          contact={contact}
          addHandler={addHandler}
          openModal={openModal}
          setOpenModal={setOpenModal}
          alert={alert}
          editContact={editContact}
        />
      </Header>

      <ContactsList
        filteredContacts={filteredContacts}
        handlerDeletecontact={handlerDeletecontact}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
        handlerEditcontact={handlerEditcontact}
      />
    </>
  );
}

export default App;
