import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../../utils/auth";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./AdminLogin.module.css";  

const AdminLogin = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);  
  const navigate = useNavigate();  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/login`, { email, password }, { withCredentials: true });
      setToken(response.data.token);
      navigate("/admin-dj-dashboard"); 
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className={`${styles.loginContainer} ${theme === "dark" ? styles.darkMode : ""}`}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2 className={styles.formTitle}>Admin Login</h2>

        <input
          type="email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        
        <input
          type="password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit" className={styles.submitButton}>Login</button>

        {error && <div className={styles.errorMessage}>{error}</div>}  {/* Error message */}
        
      </form>
    </div>
  );
};

export default AdminLogin;
