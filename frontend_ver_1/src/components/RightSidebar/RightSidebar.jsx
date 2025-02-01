import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ChevronDown, ChevronRight } from "lucide-react";
import styles from "./RightSidebar.module.css";

function RightColumn({ contentList }) {
  const [activeId, setActiveId] = useState(null);
  const { theme } = useContext(ThemeContext);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState("auto");

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobileView) {
      setContentHeight(isExpanded ? "max-content" : "40px");
    } else {
      setContentHeight("auto");
    }
  }, [isExpanded, isMobileView]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      let currentActiveId = null;

      contentList.forEach((section) => {
        const sectionId = section
          ? section.replace(/\s+/g, "-").replace(/[^\w-]+/g, "").toLowerCase()
          : undefined;
        const isSection = document.getElementById(sectionId);

        if (isSection) {
          if (
            isSection.offsetTop <= scrollPosition &&
            isSection.offsetTop + isSection.offsetHeight > scrollPosition
          ) {
            currentActiveId = sectionId;
          }
        }
      });

      if (currentActiveId !== activeId) {
        setActiveId(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId, contentList]);

  return (
    <div
      className={`${styles.rightColumn} ${theme === "dark" ? styles.darkMode : ""}`}
      style={{ height: contentHeight, transition: "height 0.3s ease-in-out" }}
    >
      <div className={styles.rightBarContent}>
        <h4
          className={styles.rightColumnHeading}
          onClick={() => isMobileView && setIsExpanded(!isExpanded)}
        >
          On this page
          {isMobileView ? (
            <span className={styles.toggleIcon}>
              {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </span>
          ) : null}
        </h4>

        <ul className={`${styles.ul} ${isMobileView && !isExpanded ? styles.hidden : ""}`}>
          {contentList.map((item, index) => {
            const sectionId = item.replace(/\s+/g, "-").replace(/[^\w-]+/g, "").toLowerCase();
            return (
              <li key={index}>
                <a href={`#${sectionId}`} className={sectionId === activeId ? styles.active : ""}>
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default RightColumn;
