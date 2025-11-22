import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import api from "../services/config";
import toast from "react-hot-toast";
const ContactsContext = createContext();

const initialState = {
  contacts: [],
  editContact: {},
  selectedContacts: [],
  filteredContacts: [],
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS": {
      return { ...state, contacts: action.payload };
    }
    case "ADD_CONTACT": {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    }
    case "EDIT_CONTACT": {
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
        editContact: action.payload,
      };
    }
    case "DELETE_CONTACTS": {
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload),
        selectedContacts: [],
      };
    }
    case "ADD_SELECTED": {
      return {
        ...state,
        selectedContacts: [...state.selectedContacts, action.payload],
      };
    }

    case "SET_SELECTED": {
      return {
        ...state,
        selectedContacts: action.payload,
      };
    }
    case "SEARCH": {
      return {
        ...state,
        filteredContacts: action.payload,
      };
    }

    default:
      return state;
  }
};

function ContactsProvider({ children }) {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  // ___________FETCH CONTACTS_________________
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get("/contacts");
        dispatch({ type: "SET_CONTACTS", payload: res });
      } catch (error) {
        toast.error("خطا در دریافت مخاطبین" + error.message);
      }
    };
    fetchContacts();
  }, []);

  // _____________ADD OR EDIT_______________
  const addHandler = async (data) => {
    try {
      // EDIT
      if (Object.keys(state.editContact).length > 0) {
        const res = await api.patch(`/contacts/${state.editContact.id}`, data);
        dispatch({ type: "EDIT_CONTACT", payload: res });
        toast.success(`ویرایش ${data.name} انجام شد`);

        dispatch({ type: "EDIT_CONTACT", payload: {} });
        // ADD
      } else {
        const res = await api.post("/contacts", data);
        dispatch({ type: "ADD_CONTACT", payload: res });
        toast.success("مخاطب جدیداضافه شد");
      }
    } catch (error) {
      toast.error("خطا در ذخیره مخاطب" + error.message);
    }
  };

  // __________DELETE MULTIPLE CONTACT_________________
  const handleDeleteContacts = async () => {
    try {
      for (let id of state.selectedContacts) {
        await api.delete(`/contacts/${id}`);
        dispatch({ type: "DELETE_CONTACTS", payload: id });
        dispatch({ type: "SET_SELECTED", payload: [] });
      }
      state.selectedContacts.length === 1
        ? toast.success("مخاطب حذف شد")
        : toast.success("مخاطبین حذف شدند");
    } catch (error) {
      toast.error("خطا در حذف مخاطب" + error.message);
    }
  };

  // _____________SEARCH_______________________
  const handleSearchContact = (e) => {
    try {
      const value = e.target.value.toLowerCase().trim();
      if (!value) {
        dispatch({ type: "SEARCH", payload: state.contacts });
        return;
      }
      const result = state.contacts.filter(
        (contact) =>
          contact.name.toLowerCase().trim().includes(value) ||
          contact.email.toLowerCase().trim().includes(value)
      );
      dispatch({ type: "SEARCH", payload: result });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        ...state,
        dispatch,
        addHandler,

        handleDeleteContacts,
        handleSearchContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}

export default ContactsProvider;

const useContacts = () => {
  const contacts = useContext(ContactsContext);
  if (!contacts) console.log("error");
  return contacts;
};

export { useContacts };

// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../services/config";
// import toast from "react-hot-toast";
// const ContactsContext = createContext();
// function ContactsProvider({ children }) {
//   const [contacts, setContacts] = useState([]);
//   const [editContact, setEditContact] = useState({});
//   const [selectedContacts, setSelectedContacts] = useState([]);
//   const [filteredContacts, setFilteredContacts] = useState([]);
// // ___________FETCH CONTACTS_________________
//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const res = await api.get("/contacts");
//         setContacts(res);
//       } catch (error) {
//         toast(error.message);
//       }
//     };
//     fetchContacts();
//   }, []);

// // _____________ADD OR EDIT_______________
//   const addHandler = async (data) => {
//     // EDIT
//     if (Object.keys(editContact).length > 0) {
//       const res = await api.patch(`/contacts/${editContact.id}`, data);
//       setContacts((prev) =>
//         prev.map((c) => (c.id === editContact.id ? res : c))
//       );
//       toast(`ویرایش ${data.name} انجام شد`);
//       setEditContact({});
//       // ADD
//     } else {
//       // const newContact = { ...data, id: Date.now() };
//       const res=await api.post("/contacts",data);
//       setContacts((prev) => [...prev, res]);
//       toast("مخاطب اضافه شد");
//     }
//   };

//   // __________DELETE MULTIPLE CONTACT_________________
//   const handleDeleteContacts =async () => {

//     for(let id of selectedContacts){
//       await api.delete(`/contacts/${id}`);
//       setContacts((prevContacts) =>
//         prevContacts.filter((contact) => contact.id !== id)
//       );
//       setSelectedContacts([]);
//     }
//   };

// // _____________SEARCH_______________________
//   const handleSearchContact = (e) => {
//     const value = e.target.value.toLowerCase().trim();
//     if(!value)
//       {setFilteredContacts(contacts)
//         return
//       }
//     setFilteredContacts(
//       contacts.filter(
//         (contact) =>
//           contact.name.toLowerCase().trim().includes(value) ||
//           contact.email.toLowerCase().trim().includes(value)
//       )
//     );
//   };

//   return (
//     <ContactsContext.Provider
//       value={{
//         contacts,
//         setContacts,
//         addHandler,
//         setEditContact,
//         editContact,
//         selectedContacts,
//         setSelectedContacts,
//         handleDeleteContacts,
//         handleSearchContact,
//         filteredContacts,
//       }}
//     >
//       {children}
//     </ContactsContext.Provider>
//   );
// }

// export default ContactsProvider;

// const useContacts = () => {
//   const contacts = useContext(ContactsContext);
//   if (!contacts) console.log("error");
//   return contacts;
// };

// export { useContacts };
