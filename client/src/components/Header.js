import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/open-folder.png";
import img2 from "../assets/user.png";
import "./Header.css";

const Header = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("userSignedIn");
        setUsername(null);
        setRole(null);
        window.location.reload();
      } else {
        console.error("Error signing out");
      }
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/userinfo", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userInfo = await response.json();
        setUsername(userInfo.username);
        setRole(userInfo.role);
      } else {
        console.error("Error fetching user information");
      }
    } catch (error) {
      console.error("Error fetching user information", error);
    }
  };

  useEffect(() => {
    const flag = localStorage.getItem("userSignedIn");
    if (flag) {
      fetchUserInfo();
    } else {
      setUsername(null);
      setRole(null);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  return (
    <header>
      <div className="heading">
        <div className="header__logo">
          <Link to="/">
            <img src={img1} alt="app-logo" />
          </Link>
        </div>
        <h3>
          <Link to="/">Files Manager</Link>
        </h3>
      </div>

      <div className="profile__sec">
        <h1>{username ? username : "Guest User"}</h1>
        <div className="profile__icon" onClick={toggleDropdown}>
          <img src={img2} alt="Profile Icon" className="profile-icon__image" />
          {dropdownVisible && (
            <div className="profile__dropdown">
              {username ? (
                <>
                  {role === "admin" && (
                    <Link to="/admin" className="dropdown__section">
                      Admin
                    </Link>
                  )}
                  <Link to="/upload" className="dropdown__section">
                    Files
                  </Link>
                  <Link
                    to="/"
                    className="dropdown__section"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/signin" className="dropdown__section">
                    Signin
                  </Link>
                  <Link to="/signup" className="dropdown__section">
                    Signup
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
