import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = ({ errorCode = "404", errorMessage = "Page Not Found" }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>{errorCode}</h1>
        <p className={styles.errorMessage}>{errorMessage}</p>
        <button className={styles.homeButton} onClick={() => navigate("/")}>
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
