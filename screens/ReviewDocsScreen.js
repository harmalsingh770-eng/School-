import { useEffect, useState } from "react";
import { db } from "../firebase/db";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

export default function ReviewDocsScreen() {
  const [data, setData] = useState(null);

  const location = useLocation();
  const { studentId, docId } = location.state || {};

  useEffect(() => {
    if (!studentId || !docId) return;

    const ref = doc(db, "students", studentId, "docs", docId);

    return onSnapshot(ref, (snap) => {
      setData(snap.data());
    });
  }, [studentId, docId]);

  const update = async (status) => {
    await updateDoc(doc(db, "students", studentId, "docs", docId), {
      status
    });
  };

  if (!data) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Document Review</h2>

        <div style={styles.previewBox}>
          <a href={data.url} target="_blank" rel="noreferrer">
            Open Document 🔗
          </a>
        </div>

        <p style={{ marginTop: 10 }}>
          Status: <b>{data.status || "pending"}</b>
        </p>

        <div style={styles.buttons}>
          <button
            style={{ ...styles.btn, background: "#22c55e" }}
            onClick={() => update("approved")}
          >
            Approve
          </button>

          <button
            style={{ ...styles.btn, background: "#ef4444" }}
            onClick={() => update("rejected")}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff"
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    padding: 30,
    borderRadius: 16,
    backdropFilter: "blur(10px)",
    textAlign: "center",
    width: 350
  },

  previewBox: {
    marginTop: 20,
    padding: 15,
    background: "rgba(255,255,255,0.15)",
    borderRadius: 10
  },

  buttons: {
    display: "flex",
    gap: 10,
    marginTop: 20
  },

  btn: {
    flex: 1,
    padding: 12,
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold"
  }
};