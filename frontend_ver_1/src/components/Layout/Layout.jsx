import React, { useState, useEffect, useContext } from "react";
import { useParams, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import MainContainer from "../MainContainer/MainContainer";
import RightSidebar from "../RightSidebar/RightSidebar";
import Header from "../Header/Header";
import styles from "./Layout.module.css";
import {
  fetchSubjectByCode,
  fetchChapterByCode,
  fetchTopicById,
} from "../../services/api";
import { ThemeContext } from "../../context/ThemeContext";
import { SidebarProvider } from "../../context/SidebarContext";

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  console.log(useParams);

  const { subjectCode } = useParams();
  const [chapters, setChapters] = useState([]);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [content, setContent] = useState([]);
  const [contentList, setContentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjectByCode(subjectCode).then((response) => {
      setChapters(response.data.chapters || []);
      setContent(response.data.subjectIntroContent || []);
      document.title = `${response.data.subjectName} – DJ Docs`;
    });
  }, [subjectCode]);

  const handleChapterClick = (chapterCode) => {
    setContentList([]);
    fetchChapterByCode(subjectCode, chapterCode).then((response) => {
      setExpandedChapters((prev) => ({
        ...prev,
        [chapterCode]: !prev[chapterCode],
      }));
      setContent(response.data.chapterIntroContent || []);
      document.title = `${response.data.chapterName} – DJ Docs`;
      navigate(`/${subjectCode}/${chapterCode}`);
    });
  };

  const handleTopicClick = (chapterCode, topicId) => {
    fetchTopicById(subjectCode, chapterCode, topicId).then((response) => {
      setContent(response.data.mainContent || []);
      setContentList(response.data.contentList || []);
      navigate(`/${subjectCode}/${chapterCode}/${topicId}`);
    });
  };

  return (
    <SidebarProvider>
      <div
        className={`${styles.appContainer} ${
          theme === "dark" ? styles.darkMode : ""
        }`}
      >
        <Header />
        <div className={styles.layout}>
          <Sidebar
            chapters={chapters}
            onChapterClick={handleChapterClick}
            expandedChapters={expandedChapters}
            onTopicClick={handleTopicClick}
          />
          <div className={styles.contentContainer}>
            <Routes>
              <Route path="/" element={<MainContainer content={content} />} />
              <Route
                path=":chapterCode"
                element={<MainContainer content={content} />}
              />
              <Route
                path=":chapterCode/:topicId"
                element={<MainContainer content={content} />}
              />
            </Routes>
            <RightSidebar contentList={contentList} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
