import styles from "./Header.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { BiSelectMultiple } from "react-icons/bi";
import DeleteModal from "./DeleteModal";

import { useModal } from "../contexts/Modal";
import { useContacts } from "../contexts/ContactsContext";

function Header({ children }) {
  const { selectedContacts, handleSearchContact, dispatch } = useContacts();
  const { handleOpenAddModal, setOpenDeleteModal, openDeleteModal } =
    useModal();

  const handleOpenModal = () => {
    if (selectedContacts.length === 0) return null;
    setOpenDeleteModal(true);
  };

  const addHandler = () => {
    dispatch({ type: "EDIT_CONTACT", payload: {} });
    handleOpenAddModal();
  };

  return (
    <>
      {children}

      {openDeleteModal && <DeleteModal />}

      <div className={styles.container}>
        <div className={styles.search}>
          <input
            type="text"
            id="select-contact"
            onChange={(e) => handleSearchContact(e)}
            placeholder="جستجو..."
          />
        </div>

        <div className={styles.controls}>
          <div className={styles.controlDelete} onClick={handleOpenModal}>
            <span>حذف مخاطبین</span>
            <BiSelectMultiple className={styles.btn} />
          </div>
          <div className={styles.controlAdd} onClick={addHandler}>
            <span>افزودن مخاطب</span>
            <CiCirclePlus className={styles.btn} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
