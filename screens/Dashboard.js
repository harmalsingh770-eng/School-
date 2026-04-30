import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#333" }}>Dashboard</h1>

      <div style={styles.grid}>
        <div style={styles.card} onClick={() => alert("Students Page")}>
          <h3>Students</h3>
        </div>

        <div style={styles.card} onClick={() => alert("Classes Page")}>
          <h3>Classes</h3>
        </div>

        <div style={styles.card} onClick={() => alert("Documents Page")}>
          <h3>Documents</h3>
        </div>
      </div>

      <button style={styles.logout} onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    minHeight: "100vh",
    background: "#f5f7fa",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 20,
    marginTop: 30,
  },
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    cursor: "pointer",
  },
  logout: {
    marginTop: 30,
    padding: 10,
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },
};