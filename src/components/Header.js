import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand" href="/">
            Forms
          </a>
          <form
            className="d-flex"
            style={{ flexGrow: 1, justifyContent: "center" }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "50%" }}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
          <div className="d-flex">
            <Link to="/login" className="btn btn-primary me-2">
              Login
            </Link>
            <Link to="/register" className="btn btn-light">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
