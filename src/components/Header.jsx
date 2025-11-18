import styles from "./Header.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { BiSelectMultiple } from "react-icons/bi";
import DeleteModal from "./DeleteModal";
import { useContact } from "../contexts/ContactContext";
import { useContacts } from "../contexts/ContactsContext";
import { useModal } from "../contexts/Modal";

function Header({ children }) {
  const { handleSearchContact } = useContacts();
  const { selectedContacts } = useContact();
  const { handleOpenAddModal, setOpenDeleteModal, openDeleteModal } =
    useModal();

  const handleOpenModal = () => {
    if (selectedContacts.length === 0) return null;
    setOpenDeleteModal(true);
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
          <div className={styles.controlAdd} onClick={handleOpenAddModal}>
            <span>افزودن مخاطب</span>
            <CiCirclePlus className={styles.btn} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
