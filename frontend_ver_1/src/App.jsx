import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import { fetchSubjects } from "./services/api";
import ScrollToTop from "./ScrollToTop";
import AdminLogin from "./pages/LoginPage/AdminLogin";
import AdminDashboard from "./pages/AdminDashboardPage/AdminDashboardPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchSubjects().then((response) => {
      setSubjects(response.data);
    });
  }, []);

  

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage subjects={subjects} />} />
        <Route path="/:subjectCode/*" element={<Layout />} />
        <Route path="/supreme-admin-login" element={<AdminLogin />} />
        <Route path="/admin-dj-dashboard/*" element={<AdminDashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
