import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Panel</h1>
      <p style={styles.subtitle}>Manage Schools & Payments</p>

      <div style={styles.grid}>
        <div style={styles.card} onClick={() => alert("Approve Schools")}>
          <h3>🏫 Approve Schools</h3>
          <p>Review and approve new schools</p>
        </div>

        <div style={styles.card} onClick={() => alert("Payments")}>
          <h3>💳 Payments</h3>
          <p>Check and verify transactions</p>
        </div>

        <div style={styles.card} onClick={() => alert("Documents")}>
          <h3>📄 Documents</h3>
          <p>Review uploaded documents</p>
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
    minHeight: "100vh",
    background: "#020617",
    color: "#fff",
    padding: 30,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 10,
    marginBottom: 30,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    maxWidth: 900,
    margin: "0 auto",
  },
  card: {
    background: "#0f172a",
    padding: 20,
    borderRadius: 12,
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
  },
  logout: {
    marginTop: 40,
    padding: 12,
    background: "#ef4444",
    border: "none",
    color: "#fff",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  },
};