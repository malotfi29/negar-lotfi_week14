import styles from "./Header.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { BiSelectMultiple } from "react-icons/bi";

function Header({
  children,
  handleSearchContact,
  setOpenModal,
  handleDeleteContacts,
  setEditContact = { setEditContact },
}) {
  const handlerAdd = () => {
    setOpenModal((is) => !is);
    setEditContact({});
  };

  return (
    <>
      {children}

      

      <div className={styles.container}>
      <div className={styles.search}>
          {/* <label htmlFor="select-contact">جستجو در مخاطبین</label> */}
          <input
            type="text"
            id="select-contact"
            onChange={(e) => handleSearchContact(e)}
            placeholder="جستجو..."
          />
        </div>
        
        <div className={styles.controls}>
          <div className={styles.controlDelete} onClick={handleDeleteContacts}>
            <span>Delete Contacts</span>
            <BiSelectMultiple className={styles.btn} />
          </div>
          <div className={styles.controlAdd} onClick={handlerAdd}>
            <span>Add Contact</span>
            <CiCirclePlus className={styles.btn} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
