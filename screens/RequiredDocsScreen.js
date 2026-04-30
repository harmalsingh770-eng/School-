import { useState, useEffect } from "react";
import { db } from "../firebase/db";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

export default function RequiredDocsScreen() {
  const [title, setTitle] = useState("");
  const [docs, setDocs] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const studentId = location.state?.studentId;

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "requiredDocs"), (snap) => {
      setDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, []);

  const addDocReq = async () => {
    if (!title) return alert("Enter document name");

    await addDoc(collection(db, "requiredDocs"), { title });
    setTitle("");
  };

  return (
    <div style={styles.container}>
      <h2>Required Documents</h2>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          placeholder="Enter document name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button style={styles.addBtn} onClick={addDocReq}>
          Add
        </button>
      </div>

      <div style={styles.grid}>
        {docs.map((item) => (
          <div
            key={item.id}
            style={styles.card}
            onClick={() =>
              navigate("/upload-doc", {
                state: { studentId, docId: item.id }
              })
            }
          >
            <h3>{item.title}</h3>
            <p>Click to upload</p>
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
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
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
    border: "none",
    outline: "none"
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
    backdropFilter: "blur(8px)",
    transition: "0.3s"
  }
};