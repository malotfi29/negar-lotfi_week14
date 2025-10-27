import styles from "./Header.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { BiSelectMultiple } from "react-icons/bi";
import DeleteModal from "./DeleteModal";

function Header({
  children,
  handleSearchContact,
  setOpenAddModal,
  setOpenDeleteModal,
  openDeleteModal,
  handleDeleteContacts,
  setEditContact,
  selectedContacts,
}) {
  const handlerAdd = () => {
    setOpenAddModal((is) => !is);
    setEditContact({});
  };

  const handleOpenModal = () => {
    if (selectedContacts.length === 0) return null;
    setOpenDeleteModal(true);
  };

  return (
    <>
      {children}

      {openDeleteModal && (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          handleDeleteContacts={handleDeleteContacts}
        />
      )}

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
          <div className={styles.controlAdd} onClick={handlerAdd}>
            <span>افزودن مخاطب</span>
            <CiCirclePlus className={styles.btn} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
