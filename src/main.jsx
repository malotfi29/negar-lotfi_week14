import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import ContactsProvider from "./contexts/ContactsContext.jsx";

import ModalProvider from "./contexts/Modal.jsx";

createRoot(document.getElementById("root")).render(
  <ContactsProvider>
    
      <ModalProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </ModalProvider>
    
  </ContactsProvider>
);
