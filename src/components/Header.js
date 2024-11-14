import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FormattedMessage } from "react-intl";
import { useLanguageContext } from "../context/LanguageContext";
import { useIntl } from "react-intl";

export default function Header() {
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

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Forms
          </Link>
          <form className="d-flex mx-auto" style={{ width: "50%" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder={intl.formatMessage({
                id: "message.label-search",
                defaultMessage: "Search",
              })}
              value={query}
              onChange={querySearch}
            />
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleResult}
            >
              <FormattedMessage
                id="message.search-button"
                defaultMessage="Search"
              />
            </button>
          </form>
          <div id="navbarNav" className="d-flex align-items-center">
            <select
              className="form-select form-select-sm me-3"
              style={{ width: "auto" }}
              value={locale}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="be">Беларуская</option>
            </select>
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  {isAdminPage() && (
                    <li className="nav-item">
                      <Link
                        className="btn btn-outline-primary me-2"
                        to="/users"
                      >
                        <FormattedMessage
                          id="message.button-admin"
                          defaultMessage="Admin Page"
                        />
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button
                      className="btn btn-primary me-2"
                      onClick={handleLogout}
                    >
                      <FormattedMessage
                        id="message.logout-button"
                        defaultMessage="Logout"
                      />
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-primary me-2" to="/login">
                      <FormattedMessage
                        id="message.login-button"
                        defaultMessage="Login"
                      />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-light" to="/register">
                      <FormattedMessage
                        id="message.sign-up-button"
                        defaultMessage="Sign up"
                      />
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
