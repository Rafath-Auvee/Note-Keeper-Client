
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import AddNote from "./components/pages/AddNote";
import EditNote from "./components/pages/EditNote";
import Test from "./components/Test/Test";
import Home from "./components/pages/Home";
import Note from "./components/pages/Note";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/note/:id" element={<Note />} />
        <Route path="/add" element={<AddNote />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/draft" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
