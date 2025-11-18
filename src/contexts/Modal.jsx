import { createContext, useContext, useState } from "react";
import { useContact } from "./ContactContext";

const ModalContext = createContext();
function ModalProvider({ children }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { setEditContact } = useContact();

  const handleOpenAddModal = () => {
    setEditContact({});
    setOpenAddModal((is) => !is);
  };
  return (
    <ModalContext.Provider
      value={{
        handleOpenAddModal,
        setOpenDeleteModal,
        openDeleteModal,
        openAddModal,
        setOpenAddModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) console.log("error");
  return context;
};
