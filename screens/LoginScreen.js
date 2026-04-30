import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginScreen() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!code || !password) {
      alert("Fill all fields");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: 20 }}>School Login</h2>

        <input
          style={styles.input}
          placeholder="School Code"
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    width: 300,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#4facfe",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
};