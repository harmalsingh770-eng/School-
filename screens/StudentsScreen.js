import { useEffect, useState } from "react";
import { db } from "../firebase/db";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function StudentsScreen({ classId }) {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "students"), (snap) => {
      setStudents(
        snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(s => s.classId === classId)
      );
    });

    return unsub;
  }, [classId]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Students</h2>
        <button
          style={styles.addBtn}
          onClick={() => navigate("/add-student", { state: { classId } })}
        >
          + Add Student
        </button>
      </div>

      <div style={styles.grid}>
        {students.map((item) => (
          <div
            key={item.id}
            style={styles.card}
            onClick={() =>
              navigate("/required-docs", {
                state: { studentId: item.id }
              })
            }
          >
            <h3>{item.name}</h3>
            <p>ID: {item.id.substring(0, 6)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    minHeight: "100vh",
    background: "linear-gradient(135deg, #141e30, #243b55)",
    color: "#fff"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  addBtn: {
    padding: "10px 16px",
    background: "#22c55e",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginTop: 30
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    padding: 20,
    borderRadius: 12,
    cursor: "pointer",
    transition: "0.3s",
    border: "1px solid rgba(255,255,255,0.1)"
  }
};