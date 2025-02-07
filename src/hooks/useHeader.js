import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useLanguageContext } from "../context/LanguageContext";
import { useIntl } from "react-intl";

const useHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const { locale, changeLanguage } = useLanguageContext();
  const intl = useIntl();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const isAdminPage = () =>
    location.pathname.startsWith("/user/") && user.role === "admin";

  const querySearch = (e) => {
    setQuery(e.target.value);
  };

  const handleResult = (e) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
    setQuery("");
  };

  const PersonalPageClick = () => {
    if (user && user._id) {
      navigate(`/user/${user._id}`);
    }
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return {
    user,
    query,
    locale,
    changeLanguage,
    intl,
    handleLogout,
    isAdminPage,
    querySearch,
    handleResult,
    PersonalPageClick,
    getInitials,
  };
};

export default useHeader;
