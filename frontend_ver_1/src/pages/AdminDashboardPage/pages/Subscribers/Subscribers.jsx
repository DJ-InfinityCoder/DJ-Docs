import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import styles from "./Subscribers.module.css";
import { ThemeContext } from "../../../../context/ThemeContext";

const Subscribers = () => {
  const { theme } = useContext(ThemeContext);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(`${API_URL}/subscriptions`);
        setSubscribers(response.data);
      } catch (err) {
        setError("Failed to load subscribers");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  const deleteSubscriber = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;

    try {
      await axios.delete(`${API_URL}/subscriptions/${id}`);
      setSubscribers(subscribers.filter((subscriber) => subscriber._id !== id));
    } catch (err) {
      alert("Failed to delete subscriber");
    }
  };

  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.darkMode : ""}`}>
      <h1>Subscribers List</h1>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : null}
      <ul className={styles.list}>
        {subscribers.map((subscriber) => (
          <li key={subscriber._id} className={styles.listItem}>
            <div className={styles.subscriberContainer}>
              <p className={styles.label}>
                <strong>Name:</strong>{" "}
                <span className={styles.subscriberName}>{subscriber.name}</span>
              </p>
              <p className={styles.label}>
                <strong>Email:</strong>{" "}
                <span className={styles.subscriberEmail}>{subscriber.email}</span>
              </p>
              <p className={styles.label}>
                <strong>Subscribed On:</strong>{" "}
                <span className={styles.subscriberDate}>
                  {new Date(subscriber.date).toLocaleDateString()}
                </span>
              </p>
            </div>
            <button className={styles.deleteButton} onClick={() => deleteSubscriber(subscriber._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subscribers;
