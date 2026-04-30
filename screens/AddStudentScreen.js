import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddStudentScreen() {
  const navigate = useNavigate();
  const { classId } = useParams(); // from URL

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const add = async () => {
    if (!name) {
      alert("Enter student name");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "students"), {
        name,
        classId,
        createdAt: new Date()
      });

      navigate(-1); // go back
    } catch (err) {
      alert("Error adding student");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add Student</h2>

        <input
          style={styles.input}
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button style={styles.button} onClick={add}>
          {loading ? "Adding..." : "Add Student"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    width: 320,
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center"
  },
  title: {
    marginBottom: 20,
    color: "#333"
  },
  input: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    marginBottom: 20,
    outline: "none"
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold"
  }
};