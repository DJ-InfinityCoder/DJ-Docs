import React, { useState, useEffect,useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./AdminDashboard.module.css";
import Nav from "./components/Nav/Nav";
import Sidebar from "./components/Sidebar/Sidebar";
import Overview from "./pages/Overview/Overview";
import Subscribers from "./pages/Subscribers/Subscribers";
import SuggestedTopics from "./pages/SuggestedTopics/SuggestedTopics";
import Feedbacks from "./pages/Feedbacks/Feedbacks";
import UpdateDocs from "./pages/UpdateDocs/UpdateDocs";
import SendEmails from "./pages/SendEmails/SendEmails";
import ErrorPage from "../ErrorPage/ErrorPage";

const AdminDashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);


  return (
    <div className={`${styles.dashboardContainer} ${theme === "dark" ? styles.darkMode : ""}`}>
      <Nav />
      <div className={styles.dashboardLayout}>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className={`${styles.mainContent} ${isSidebarOpen ? styles.mainContentOpen : styles.mainContentClose}`}>
          <Routes>
          <Route index element={<Navigate to="overview" />} />
            <Route path="overview" element={<Overview />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="suggested-topics" element={<SuggestedTopics />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="update-docs" element={<UpdateDocs />} />
            <Route path="send-emails" element={<SendEmails />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
