import React from 'react';
import styles from './LandingPage.module.css';

const SubjectCard = ({ name, subjectCode, onSubjectClick }) => {
  const handleClick = () => {
    onSubjectClick(subjectCode);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <h2 className={styles.subjectName}>{name}</h2>
      <button className={styles.learnMoreButton}>Learn More</button>
    </div>
  );
};

export default SubjectCard;
