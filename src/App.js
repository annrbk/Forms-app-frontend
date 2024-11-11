import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PersonalUserPage from "./pages/PersonalUserPage";
import CreateTemplate from "./components/createTemplatePage/CreateTemplate";
import TemplatePage from "./pages/TemplatePage";
import { UserProvider } from "./context/UserContext";
import AdminPage from "./pages/AdminPage";
import FormPage from "./pages/FormPage";
import SearchResult from "./components/SearchResult";
import ResultByTag from "./components/ResultByTag";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/:userId" element={<PersonalUserPage />} />
          <Route path="/create-template" element={<CreateTemplate />} />
          <Route path="/template/:id" element={<TemplatePage />} />
          <Route path="/templates/:id" element={<TemplatePage />} />
          <Route path="/users" element={<AdminPage />} />
          <Route path="/form/:id" element={<FormPage />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/templates-tag/:tagId" element={<ResultByTag />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
