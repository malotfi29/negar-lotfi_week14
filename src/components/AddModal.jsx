import { useEffect } from "react";
import styles from "./AddModal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";

import { useModal } from "../contexts/Modal";
import { useContacts } from "../contexts/ContactsContext";

function AddModal() {
  const { addHandler, editContact, dispatch } = useContacts();
  const { openAddModal, setOpenAddModal } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      job: "",
    },
  });

  useEffect(() => {
    if (Object.keys(editContact).length > 0) {
      reset(editContact);
    }
  }, [editContact, reset]);

  if (!openAddModal) return null;

  const lengthOfEditContact = Object.keys(editContact).length;

  const onSubmit = (data) => {
    addHandler(data);
    reset({
      name: "",
      email: "",
      phone: "",
      job: "",
    });

    setOpenAddModal((is) => !is);
  };

  const closeBackdrop = () => {
    dispatch({ type: "EDIT_CONTACT", payload: {} });
    setOpenAddModal(false);
    reset({
      name: "",
      email: "",
      phone: "",
      job: "",
    });
  };

  return (
    <>
      <div className={styles.backdrop} onClick={closeBackdrop}></div>

      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>
            {lengthOfEditContact ? "ویرایش مخاطب" : "اضافه کردن مخاطب جدید"}
          </h3>
          <IoIosCloseCircleOutline
            className={styles.btn}
            onClick={closeBackdrop}
          />
        </div>

        <form className={styles.modalContent} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">نام و نام خانوادگی</label>
            <input
              id="name"
              {...register("name", { required: "نام الزامی است" })}
            />
            {errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email">ایمیل</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "ایمیل الزامی است",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "فرمت ایمیل اشتباه است",
                },
              })}
            />
            {errors.email && (
              <p className={styles.error}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone">تلفن</label>
            <input
              id="phone"
              {...register("phone", {
                required: "تلفن الزامی است",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "شماره تلفن باید فقط عدد باشد",
                },
              })}
            />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>

          <button type="submit">
            {lengthOfEditContact ? "ویرایش" : "افزودن"}
          </button>
        </form>

        {/* <div className={styles.alert}>{addAlert && <p>{addAlert}</p>}</div> */}
      </div>
    </>
  );
}

export default AddModal;
