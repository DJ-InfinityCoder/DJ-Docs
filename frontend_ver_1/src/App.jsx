import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LandingPage from "./components/LandingPage/LandingPage";
import { fetchSubjects } from "./services/api";
import ScrollToTop from "./ScrollToTop";


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
      </Routes>
    </Router>
  );
};

export default App;
