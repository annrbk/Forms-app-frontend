import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);
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
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
          <div id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  {isAdminPage() && (
                    <li className="nav-item">
                      <Link
                        className="btn btn-outline-primary me-2"
                        to="/users"
                      >
                        Admin Page
                      </Link>
                    </li>
                  )}
                  <li className="nav-item">
                    <button
                      className="btn btn-primary me-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-primary me-2" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-light" to="/register">
                      Sign up
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
