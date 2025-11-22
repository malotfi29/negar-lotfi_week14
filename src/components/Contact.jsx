import styles from "./ContactsList.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

import { useModal } from "../contexts/Modal";
import { useContacts } from "../contexts/ContactsContext";
import shortText from "../helper/shortText";

function Contact({ contact }) {
  const { dispatch} = useContacts();
  const { setOpenAddModal, setOpenDeleteModal } = useModal();

  const handlerEditcontact = () => {
    dispatch({ type: "EDIT_CONTACT", payload: contact });
    setOpenAddModal((is) => !is);
  };
  return (
    <li className={styles.contact}>
      <div className={styles.contactName}>
        <input
          type="checkbox"
          onChange={() =>
            dispatch({ type: "ADD_SELECTED", payload: contact.id })
          }
        />
        <p>{shortText(contact.name,5)}</p>
      </div>
      <p p className={styles.contactEmail}>
        <MdOutlineMarkEmailUnread className={styles.btn} />
        {shortText(contact.email,10)}
      </p>
      <p className={styles.contactPhone}>
        <MdOutlinePhone className={styles.btn} />
        {contact.phone}
      </p>
      <div className={styles.contactBtns}>
        <FaRegTrashAlt
          className={styles.btnTrash}
          onClick={() => {
            setOpenDeleteModal(true);
            dispatch({ type: "ADD_SELECTED", payload: contact.id });
          }}
        />
        <RiEdit2Fill
          className={styles.btnEdit}
          onClick={() => {
            handlerEditcontact(contact);
          }}
        />
      </div>
    </li>
  );
}

export default Contact;
