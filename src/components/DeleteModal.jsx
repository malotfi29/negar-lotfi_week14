import { IoIosCloseCircleOutline } from "react-icons/io";
import styles from "./DeleteModal.module.css";

import { useModal } from "../contexts/Modal";
import { useContacts } from "../contexts/ContactsContext";

function DeleteModal({}) {
  const { handleDeleteContacts } = useContacts();
  const { setOpenDeleteModal, openDeleteModal } = useModal();
  const closeModal = () => {
    setOpenDeleteModal(false);
  };
  const handleDelete = () => {
    handleDeleteContacts();
    setOpenDeleteModal(false);
  };

  if (!openDeleteModal) return null;
  return (
    <div>
      <div className={styles.backdrop} onClick={closeModal}></div>
      <div className={styles.modal}>
        <div className={styles.header}>
          <p>حذف مخاطب</p>
          <IoIosCloseCircleOutline
            className={styles.btn}
            onClick={() => setOpenDeleteModal(false)}
          />
        </div>
        <h3>آیا از حذف مطمین هستید؟</h3>
        <div className={styles.controls}>
          <button onClick={handleDelete}>حذف</button>
          <button onClick={closeModal}>بازگشت</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
