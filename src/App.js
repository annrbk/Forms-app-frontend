import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from "./components/UserPage";
import CreateTemplate from "./components/CreateTemplate";
import TemplatePage from "./components/TemplatePage";
import { UserProvider } from "./context/UserContext";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/:userId" element={<UserPage />} />
          <Route path="/create-template" element={<CreateTemplate />} />
          <Route path="/template/:id" element={<TemplatePage />} />
          <Route path="/templates/:id" element={<TemplatePage />} />
          <Route path="/users" element={<AdminPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
