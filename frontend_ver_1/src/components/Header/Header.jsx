import React, { useContext, useState, useEffect, useRef } from "react";
import { Sun, Moon, Search, X } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import { useSidebar } from "../../context/SidebarContext";
import gsap from "gsap";
import styles from "./Header.module.css";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { toggleSidebar, isSidebarVisible } = useSidebar();
  const [isSearchActive, setSearchActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);
  const overlayRef = useRef(null);
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (!isSidebarVisible) {
      setIsActive(false);
    }
  }, [isSidebarVisible]);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    toggleSidebar();
  };

  const { width } = useWindowSize();

  const getScale = () => {
    if (width < 480) {
      return 0.8;
    }
    if (width < 768) {
      return 1.2;
    }
    return 1.5;
  };

  const handleSearchClick = () => {
    setTimeout(() => {
      setShowSuggestions(true);
    }, 1000);
    setSearchActive(true);
    const tl = gsap.timeline();

    tl.to(overlayRef.current, {
      opacity: 1,
      visibility: "visible",
      backdropFilter: "blur(10px)",
      duration: 0.3,
    });

    tl.to(
      searchRef.current,
      {
        y: "20vh",
        scale: getScale(),
        ease: "circ.in",
        duration: 0.15,
      },
      "-=0.2"
    );

    setTimeout(() => {
      if (cancelBtnRef.current) {
        gsap.to(cancelBtnRef.current, {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          delay: 1,
        });
      }
    }, 300);
  };

  const handleCloseSearch = () => {
    setShowSuggestions(false);
    const tl = gsap.timeline();

    tl.to(cancelBtnRef.current, { autoAlpha: 0, scale: 0.8, duration: 0.2 });
    tl.to(
      searchRef.current,
      {
        y: "0",
        scale: 1,
        ease: "circ.out",
        duration: 0.2,
      },
      "-=0.1"
    );

    tl.to(overlayRef.current, {
      opacity: 0,
      visibility: "hidden",
      backdropFilter: "blur(0px)",
      duration: 0.5,
    });
    setSearchActive(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        handleSearchClick();
      }

      if (event.key === "Escape" && isSearchActive) {
        handleCloseSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchActive]);

  return (
    <>
      <header
        className={`${styles.header} ${
          theme === "dark" ? styles.darkMode : ""
        }`}
      >
        <div ref={overlayRef} className={styles.overlay}></div>
        <div className={styles.leftSection}>
          <div className={styles.logo}>DJ Docs</div>
        </div>

        <div className={styles.centerSection}>
          <div
            ref={searchRef}
            className={`${styles.searchBarContainer} ${
              isSearchActive === true ? styles.searchBarcontainerOpen : ""
            }`}
            onClick={handleSearchClick}
          >
            <div>
              <input
                type="text"
                placeholder="Search..."
                className={`${styles.searchBar} ${
                  theme === "dark" ? styles.darkMode : ""
                } ${isSearchActive === true ? styles.searchOpen : ""}`}
              />
              {!isSearchActive && (
                <div className={styles.shortKey}>
                  <p>Ctrl K</p>
                </div>
              )}
            </div>
            {isSearchActive && (
              <div
                className={`${styles.searchSuggestion}  ${
                  showSuggestions === true ? styles.show : ""
                }`}
              >
                <p>Sorry Guys, Search Functionality will be added Soon.</p>
              </div>
            )}
          </div>
          {isSearchActive && (
            <button
              ref={cancelBtnRef}
              className={`${styles.closeButton} ${
                isSearchActive === true ? styles.closeButtonMB : ""
              }`}
              onClick={handleCloseSearch}
            >
              <X size={40} color="white" />
            </button>
          )}
        </div>

        <div className={styles.rightSection}>
          <button
            title="Search"
            className={`${styles.iconButton} ${styles.searchIcon}`}
            onClick={handleSearchClick}
          >
            {theme === "dark" ? (
              <Search size={22} color="white" />
            ) : (
              <Search size={22} />
            )}
          </button>

          <button
            title="Toggle theme"
            className={styles.iconButton}
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <Moon size={22} color="white" />
            ) : (
              <Sun size={22} />
            )}
          </button>

          <div
            className={`${styles.hamburger} ${isActive ? styles.isActive : ""}`}
            onClick={handleClick}
          >
            <span className={styles.line}></span>
            <span className={styles.line}></span>
            <span className={styles.line}></span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
