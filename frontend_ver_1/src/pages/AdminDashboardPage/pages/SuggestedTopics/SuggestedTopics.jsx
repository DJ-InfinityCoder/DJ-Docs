import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import styles from "./SuggestedTopics.module.css";
import { ThemeContext } from "../../../../context/ThemeContext";


const SuggestedTopics = () => {
  const { theme } = useContext(ThemeContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${API_URL}/suggested-topics`);
        setTopics(response.data);
      } catch (err) {
        setError("Failed to load topics");
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const deleteTopic = async (id) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;

    try {
      await axios.delete(`${API_URL}/suggested-topics/${id}`);
      setTopics(topics.filter((topic) => topic._id !== id));
    } catch (err) {
      alert("Failed to delete topic");
    }
  };

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.darkMode : ""}`}>
      <h1>Suggested Topics</h1>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : null}
      <ul className={styles.list}>
        {topics.map((topic) => (
          <li key={topic._id} className={styles.listItem}>
            <div className={styles.topicContainer}>
              <p className={styles.label}>
                <strong>Topic Name:</strong>{" "}
                <span className={styles.topicTitle}>{topic.topicName}</span>
              </p>
              <p className={styles.label}>
                <strong>Suggested By:</strong>{" "}
                <span className={styles.topicDetails}>{topic.username}</span>
              </p>
              <p className={styles.label}>
                <strong>User Email:</strong>{" "}
                <span className={styles.topicDetails}>{topic.email}</span>
              </p>
              <p className={styles.label}>
                <strong>Description:</strong>{" "}
                <span className={styles.description}>{topic.description}</span>
              </p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => deleteTopic(topic._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedTopics;
