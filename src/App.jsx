import { useEffect, useState } from "react";
import ContactsList from "./components/ContactsList";
import Header from "./components/Header";
import AddModal from "./components/AddModal";
import DeleteModal from "./components/DeleteModal";

function App() {
  const [addAlert, setAddAlert] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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

  const addHandler = (data) => {
    setAddAlert("");
    if (Object.keys(editContact).length > 0) {
      setContacts(
        contacts.map((c) => (c.id === editContact.id ? { ...c, ...data } : c))
      );
      setEditContact({});
    } else {
      const newContact = { ...data, id: Date.now() };

      setContacts((contacts) => [...contacts, newContact]);
    }
    setOpenAddModal(false);

    setContact({
      id: "",
      name: "",
      email: "",
      phone: "",
    });
  };

  const handlerEditcontact = (contact) => {
    setOpenAddModal((is) => !is);
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
    setSelectedContacts([]);
    setOpenDeleteModal(false);
  };

  return (
    <div className="main">
      <Header
        setOpenAddModal={setOpenAddModal}
        setOpenDeleteModal={setOpenDeleteModal}
        openDeleteModal={openDeleteModal}
        handleSearchContact={handleSearchContact}
        handleDeleteContacts={handleDeleteContacts}
        setEditContact={setEditContact}
        selectedContacts={selectedContacts}
      >
        <AddModal
          setContact={setContact}
          contact={contact}
          addHandler={addHandler}
          openAddModal={openAddModal}
          setOpenAddModal={setOpenAddModal}
          addAlert={addAlert}
          editContact={editContact}
          setEditContact={setEditContact}
        />
      </Header>

      <ContactsList
        filteredContacts={filteredContacts}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
        handlerEditcontact={handlerEditcontact}
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </div>
  );
}

export default App;
