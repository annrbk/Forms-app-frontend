import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./components/UserPage";
import CreateTemplate from "./components/CreateTemplate";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/create-template" element={<CreateTemplate />} />
      </Routes>
    </Router>
  );
}

export default App;
