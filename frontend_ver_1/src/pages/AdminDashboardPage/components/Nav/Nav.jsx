import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../../../../context/ThemeContext";
import { getToken, removeToken } from "../../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "./Nav.module.css";

const Nav = () => {
  const { theme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
            withCredentials: true,
          }
        );
        setAdminData(response.data); 
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        navigate("/supreme-admin-login");
      }
    };
    fetchDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/logout`,
        {},
        { withCredentials: true }
      );
      removeToken();
      navigate("/supreme-admin-login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${styles.profileIcon}`) && !event.target.closest(`.${styles.profileDropdown}`)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {adminData ? ( 
        <header className={`${styles.header} ${theme === "dark" ? styles.darkMode : ""}`}>
          <div className={styles.logo}>
            <h1>DJ Docs Admin Panel</h1>
          </div>
          <div className={styles.rightNavItem}>
            <div className={styles.welcomeText}>
              Welcome, <span>{adminData.admin.name}</span>
            </div>
            <div
              className={styles.profileIcon}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUserCircle size={25} />
            </div>
          </div>

          {isDropdownOpen && (
            <div className={styles.profileDropdown}>
              <p>
                <strong>{adminData.admin.name}</strong>
              </p>
              <p className={styles.email}>{adminData.admin.email}</p>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          )}
        </header>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Nav;
