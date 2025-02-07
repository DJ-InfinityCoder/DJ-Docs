import React, { useState,useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaEnvelope, FaFileAlt, FaUsers, FaBars } from "react-icons/fa";
import { MdFeedback, MdEditDocument } from "react-icons/md";
import styles from "./Sidebar.module.css";
import { ThemeContext } from "../../../../context/ThemeContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { theme } = useContext(ThemeContext);
  const [activeItem, setActiveItem] = useState("/admin-dj-dashboard/overview");

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <aside
      className={`${styles.sidebar} ${
        isOpen ? styles.sidebarOpen : styles.sidebarClose
      } ${theme === "dark" ? styles.darkMode : ""}`}
    >
      <div className={styles.hamburgerIcon} onClick={toggleSidebar}>
        <FaBars size={22} />
      </div>
      <ul className={styles.sidebarList}>
        <li
          className={
            activeItem === "/admin-dj-dashboard/overview"
              ? styles.activeLink
              : ""
          }
          onClick={() => handleItemClick("/admin-dj-dashboard/overview")}
        >
          <NavLink
            to="/admin-dj-dashboard/overview"
            className={styles.sidebarLink}
          >
            <div className={styles.sidebarIcon}>
              <FaHome size={20} />
            </div>
            <div className={styles.sidebarText}>Overview</div>
          </NavLink>
        </li>
        <li
          className={
            activeItem === "/admin-dj-dashboard/subscribers"
              ? styles.activeLink
              : ""
          }
          onClick={() => handleItemClick("/admin-dj-dashboard/subscribers")}
        >
          <NavLink
            to="/admin-dj-dashboard/subscribers"
            className={styles.sidebarLink}
          >
            <div className={styles.sidebarIcon}>
              <FaUsers size={20} />
            </div>
            <div className={styles.sidebarText}>Subscribers</div>
          </NavLink>
        </li>
        <li
          className={
            activeItem === "/admin-dj-dashboard/suggested-topics"
              ? styles.activeLink
              : ""
          }
          onClick={() =>
            handleItemClick("/admin-dj-dashboard/suggested-topics")
          }
        >
          <NavLink
            to="/admin-dj-dashboard/suggested-topics"
            className={styles.sidebarLink}
          >
            <div className={styles.sidebarIcon}>
              <FaFileAlt size={20} />
            </div>
            <div className={styles.sidebarText}>Suggested Topics</div>
          </NavLink>
        </li>
        <li
          className={
            activeItem === "/admin-dj-dashboard/feedbacks"
              ? styles.activeLink
              : ""
          }
          onClick={() => handleItemClick("/admin-dj-dashboard/feedbacks")}
        >
          <NavLink
            to="/admin-dj-dashboard/feedbacks"
            className={styles.sidebarLink}
          >
            <div className={styles.sidebarIcon}>
              <MdFeedback size={20} />
            </div>
            <div className={styles.sidebarText}>Feedbacks</div>
          </NavLink>
        </li>
        <li
          className={
            activeItem === "/admin-dj-dashboard/update-docs"
              ? styles.activeLink
              : ""
          }
          onClick={() => handleItemClick("/admin-dj-dashboard/update-docs")}
        >
          <NavLink
            to="/admin-dj-dashboard/update-docs"
            className={styles.sidebarLink}
          >
            <div className={styles.sidebarIcon}>
              <MdEditDocument size={20} />
            </div>
            <div className={styles.sidebarText}>Update Docs</div>
          </NavLink>
        </li>
        <li
          className={
            activeItem === "/admin-dj-dashboard/send-emails"
              ? styles.activeLink
              : ""
          }
          onClick={() => handleItemClick("/admin-dj-dashboard/send-emails")}
        >
          <NavLink
            to="/admin-dj-dashboard/send-emails"
            className={styles.sidebarLink}
          >
            <div className={styles.sidebarIcon}>
              <FaEnvelope size={20} />
            </div>
            <div className={styles.sidebarText}>Send Emails</div>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
