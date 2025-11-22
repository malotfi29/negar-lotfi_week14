import { useEffect } from "react";
import styles from "./AddModal.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";

import { useModal } from "../contexts/Modal";
import { useContacts } from "../contexts/ContactsContext";
import Input from "./Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../helper/contactSchema";

function AddModal() {
  const { addHandler, editContact, dispatch } = useContacts();
  const { openAddModal, setOpenAddModal } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
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
          <Input
            name="name"
            label="نام و نام خانوادگی"
            register={register}
            errors={errors}
          />

          <Input
            name="email"
            label="ایمیل"
            register={register}
            errors={errors}
          />

          <Input
            name="phone"
            label="شماره تماس"
            register={register}
            errors={errors}
          />

          <button type="submit">
            {lengthOfEditContact ? "ویرایش" : "افزودن"}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddModal;
