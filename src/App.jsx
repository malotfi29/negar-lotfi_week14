
import ContactsList from "./components/ContactsList";
import Header from "./components/Header";
import AddModal from "./components/AddModal";



function App() {
  return (
    <div className="main">
      <Header>
        <AddModal />
      </Header>
      <ContactsList />
    </div>
  );
}

export default App;
