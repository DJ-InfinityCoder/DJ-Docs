import React, { useState, useContext } from "react";
import { FaChevronRight } from "react-icons/fa";
import styles from "./Sidebar.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useSidebar } from "../../context/SidebarContext";

const Sidebar = ({ chapters, onChapterClick, onTopicClick }) => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const [openChapter, setOpenChapter] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);

  const handleChapterClick = (chapterCode, index) => {
    if (openChapter === index) {
      setOpenChapter(null);
      setActiveTopic(null);
    } else {
      setOpenChapter(index);
      setActiveTopic(null);
      onChapterClick(chapterCode);
      toggleSidebar();
    }
  };

  const handleTopicClick = (chapterCode, topicId, subIndex) => {
    setActiveTopic(subIndex);
    onTopicClick(chapterCode, topicId);
    toggleSidebar();
  };

  return (
    <div
      className={`${styles.sidebar} ${
        theme === "dark" ? styles.darkMode : ""
      } ${isSidebarVisible ? styles.show : ""}`}
    >
      <div className={styles.sidebarContent}>
        <ul className={styles.linksContainer}>
          {chapters.map((chapter, index) => {
            const isChapterOpen = openChapter === index;

            return (
              <li key={index} className={styles.linkItem}>
                <div
                  onClick={() => handleChapterClick(chapter.chapterCode, index)}
                  className={`${styles.dropdown} ${
                    isChapterOpen ? styles.activeLink : ""
                  }`}
                >
                  <div className={styles.linkText}>{chapter.chapterName}</div>
                  <span
                    className={`${styles.icon} ${
                      isChapterOpen ? styles.rotate : ""
                    }`}
                  >
                    <FaChevronRight />
                  </span>
                </div>
                {isChapterOpen && (
                  <ul>
                    <div className={styles.subLinks}>
                      {chapter.topics.map((topic, subIndex) => (
                        <li
                          key={subIndex}
                          className={styles.sublinkItem}
                          onClick={() =>
                            handleTopicClick(
                              chapter.chapterCode,
                              topic.topicId,
                              subIndex
                            )
                          }
                        >
                          <div
                            className={`${styles.linkText} ${
                              isChapterOpen && activeTopic === subIndex
                                ? styles.active
                                : ""
                            }`}
                          >
                            {topic.topicName}
                          </div>
                        </li>
                      ))}
                    </div>
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
