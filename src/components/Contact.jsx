import styles from "./ContactsList.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

function Contact({ contact, handlerDeletecontact,selectedContacts,setSelectedContacts,handlerEditcontact  }) {
  return (
    <li className={styles.contact}>
      <div className={styles.contactName}>
        <input type="checkbox" onChange={()=>setSelectedContacts([...selectedContacts,contact.id])} />
        <p>{contact.name}</p>
      </div>
      <p p className={styles.contactEmail}>
        <MdOutlineMarkEmailUnread className={styles.btn} />
        {contact.email}
      </p>
      <p className={styles.contactPhone}>
        <MdOutlinePhone className={styles.btn} />
        {contact.phone}
      </p>
      <div className={styles.contactBtns}>
      <FaRegTrashAlt
        className={styles.btnTrash}
        onClick={() => handlerDeletecontact(contact.id)}
      />
      
      <RiEdit2Fill className={styles.btnEdit}  onClick={() => handlerEditcontact(contact)} />
      </div>
    </li>
  );
}

export default Contact;
