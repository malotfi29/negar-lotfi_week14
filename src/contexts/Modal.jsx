import { createContext, useContext, useState } from "react";

import { useContacts } from "./ContactsContext";

const ModalContext = createContext();
function ModalProvider({ children }) {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { dispatch } = useContacts();

  const handleOpenAddModal = () => {
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
