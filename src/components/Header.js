import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Avatar } from "@mui/material";
import useHeader from "../hooks/useHeader";

export default function Header() {
  const {
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
  } = useHeader();

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
              onChange={changeLanguage}
            >
              <option value="en">Eng</option>
              <option value="be">Бел</option>
            </select>
            <ul className="navbar-nav ms-auto">
              {user ? (
                <div className="d-flex">
                  <Avatar
                    onClick={PersonalPageClick}
                    className="me-3"
                    sx={{
                      backgroundColor: "#198754",
                    }}
                  >
                    {getInitials(user.name)}
                  </Avatar>
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
                </div>
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
