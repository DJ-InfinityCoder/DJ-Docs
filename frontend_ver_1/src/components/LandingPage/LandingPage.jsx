import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import SubjectCard from "./SubjectCard";
import { FaSearch, FaSun, FaMoon, FaChevronDown } from "react-icons/fa";

const LandingPage = ({ subjects }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);

  const handleSubjectsClick = (subjectCode) => {
    window.open(`/${subjectCode}`, "_blank");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.subjectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.app}>
      <div className={isDarkMode ? styles.darkContainer : styles.container}>
        {/* Navbar */}
        <header className={styles.navbar}>
          <div className={styles.navLeft}>
            <h1>DJ Docs</h1>
          </div>
          <div className={styles.navRight}>
            <input
              type="text"
              className={styles.searchBar}
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button onClick={toggleDarkMode} className={styles.toggleButton}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <h2>Welcome to DJ Docs</h2>
          <p>Your hub for all things documentation</p>
        </section>

        {/* Key Features Section */}
        <section className={styles.featuresSection}>
          <h2>Key Features</h2>
          <div className={styles.features}>
            <div className={styles.feature}>
              <FaSearch className={styles.icon} />
              <h3>Comprehensive Guides</h3>
              <p>Access in-depth documentation on a variety of subjects.</p>
            </div>
            <div className={styles.feature}>
              <FaSun className={styles.icon} />
              <h3>Easy Navigation</h3>
              <p>
                Quickly find what you need with intuitive category listings.
              </p>
            </div>
            <div className={styles.feature}>
              <FaMoon className={styles.icon} />
              <h3>Regular Updates</h3>
              <p>Stay up-to-date with the latest changes and additions.</p>
            </div>
          </div>
        </section>

        {/* Subject Cards Section */}
        <section className={styles.subjectsSection}>
          <h2>Explore Our Subjects</h2>
          <div className={styles.cardsContainer}>
            {filteredSubjects.map((subject) => (
              <SubjectCard
                key={subject.subjectCode}
                name={subject.subjectName}
                subjectCode={subject.subjectCode}
                onSubjectClick={handleSubjectsClick}
              />
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqContainer}>
            {[
              "What subjects do you cover?",
              "How often is the content updated?",
              "Can I contribute to DJ Docs?",
            ].map((question, index) => (
              <div key={index} className={styles.faqItem}>
                <div
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                >
                  <h3>{question}</h3>
                  <FaChevronDown
                    className={`${styles.faqIcon} ${
                      activeFAQ === index ? styles.rotated : ""
                    }`}
                  />
                </div>
                {activeFAQ === index && (
                  <div className={styles.faqAnswer}>
                    <p>
                      {index === 0 &&
                        "We offer documentation on a wide range of topics, including programming languages, frameworks, design principles, and more."}
                      {index === 1 &&
                        "Our content is regularly updated to ensure it remains relevant and up-to-date with industry trends and changes."}
                      {index === 2 &&
                        "Yes! If you want to contribute, you can contact us, and we'll provide guidelines on how to get involved."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2025 DJ Docs. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
