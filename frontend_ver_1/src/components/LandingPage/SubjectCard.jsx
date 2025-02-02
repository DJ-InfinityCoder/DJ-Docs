import React from 'react';
import styles from './LandingPage.module.css';

const SubjectCard = ({ name, subjectCode, onSubjectClick, imageUrl }) => {
  const handleClick = () => {
    onSubjectClick(subjectCode);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.cardImage}>
        <img src={`https://picsum.photos/300/200?random=${Math.random()}`} alt={name} />
      </div>
      <h2 className={styles.subjectName}>{name}</h2>
      <button className={styles.learnMoreButton}>Learn More</button>
    </div>
  );
};

export default SubjectCard;
