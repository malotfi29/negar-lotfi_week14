
import ContactsList from "./components/ContactsList";
import Header from "./components/Header";
import AddModal from "./components/AddModal";
import { Toaster } from "react-hot-toast";



function App() {
  return (
    <div className="main">
      <Toaster/>
      <Header>
        <AddModal />
      </Header>
      <ContactsList />
    </div>
  );
}

export default App;
