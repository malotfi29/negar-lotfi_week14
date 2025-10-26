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
          <label htmlFor="select-contact">جستجو در مخاطبین</label>
          <input
            type="text"
            id="select-contact"
            onChange={(e) => handleSearchContact(e)}
          />
        </div>
        <div className={styles.controls}>
          <BiSelectMultiple
            className={styles.btn}
            onClick={handleDeleteContacts}
          />
          <CiCirclePlus className={styles.btn} onClick={handlerAdd} />
        </div>
      </div>
    </>
  );
}

export default Header;
