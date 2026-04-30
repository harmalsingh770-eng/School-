import { useState, useEffect } from "react";
import { db } from "../firebase/db";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ClassesScreen() {
  const [name, setName] = useState("");
  const [classes, setClasses] = useState([]);

  const navigate = useNavigate();

  // 🔥 TEMP (replace later with real auth)
  const schoolId = "demoSchool";

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "classes"), (snap) => {
      setClasses(
        snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(c => c.schoolId === schoolId)
      );
    });

    return unsub;
  }, []);

  const addClass = async () => {
    if (!name) return alert("Enter class name");

    await addDoc(collection(db, "classes"), {
      name,
      schoolId,
      createdAt: new Date()
    });

    setName("");
  };

  return (
    <div style={styles.container}>
      <h2>Classes</h2>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          placeholder="Enter class name (e.g. 10th A)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button style={styles.addBtn} onClick={addClass}>
          Add
        </button>
      </div>

      <div style={styles.grid}>
        {classes.map((item) => (
          <div
            key={item.id}
            style={styles.card}
            onClick={() =>
              navigate("/students", {
                state: { classId: item.id }
              })
            }
          >
            <h3>{item.name}</h3>
            <p>Open Students →</p>
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
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    color: "#fff"
  },

  inputBox: {
    display: "flex",
    gap: 10,
    marginTop: 20
  },

  input: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    border: "none"
  },

  addBtn: {
    padding: "12px 20px",
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
    background: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 12,
    cursor: "pointer",
    backdropFilter: "blur(10px)"
  }
};