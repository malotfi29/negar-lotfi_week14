import { useEffect } from "react";
import styles from "./Modal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";

function Modal({
  openModal,
  setOpenModal,
  setContact,
  contact,
  addHandler,
  alert,
  editContact,
}) {
  useEffect(() => {
    if (Object.keys(editContact).length > 0) setContact(editContact);
  }, [editContact, setContact]);
  if (!openModal) return null;
  const lengthOfEditContact = Object.keys(editContact).length;

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => setOpenModal(false)}
      ></div>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>اضافه کردن مخاطب جدید</h3>
          <IoIosCloseCircleOutline
            className={styles.btn}
            onClick={() => setOpenModal(false)}
          />
        </div>
        <form className={styles.modalContent}>
          <div>
            <label htmlFor="name">نام و نام خانوادگی</label>
            <input
              type="text"
              id="name"
              name="name"
              value={contact.name}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="email">ایمیل</label>

            <input
              type="text"
              id="email"
              name="email"
              value={contact.email}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="phone">تلفن</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contact.phone}
              onChange={changeHandler}
            />
          </div>
          <div>
            <label htmlFor="job">شغل</label>

            <input
              type="text"
              id="job"
              name="job"
              value={contact.job}
              onChange={changeHandler}
            />
          </div>
          {lengthOfEditContact ? (
            <button type="submit" onClick={(e) => addHandler(e)}>
              ویرایش
            </button>
          ) : (
            <button type="submit" onClick={(e) => addHandler(e)}>
              افزودن
            </button>
          )}
        </form>
        <div>{alert && <p>{alert}</p>}</div>
      </div>
    </>
  );
}

export default Modal;
