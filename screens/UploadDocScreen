import { useState } from "react";
import { db } from "../firebase/db";
import { collection, addDoc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

export default function UploadDocScreen() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { studentId, docId } = location.state || {};

  const handleUpload = async () => {
    if (!name || !url) {
      alert("Fill all fields");
      return;
    }

    try {
      await addDoc(
        collection(db, "students", studentId, "docs"),
        {
          name,
          url,
          status: "pending",
          createdAt: new Date()
        }
      );

      alert("Document submitted successfully!");
      navigate(-1);
    } catch (err) {
      alert("Error uploading document");
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Upload Document</h2>

        <input
          style={styles.input}
          placeholder="Document Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Paste Google Drive Link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button style={styles.button} onClick={handleUpload}>
          Submit
        </button>

        <div style={styles.guide}>
          <p><b>How to upload:</b></p>
          <ol>
            <li>Upload file to Google Drive</li>
            <li>Click "Share"</li>
            <li>Select "Anyone with link"</li>
            <li>Copy link & paste here</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 14,
    width: 350,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },

  input: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
    border: "1px solid #ccc"
  },

  button: {
    width: "100%",
    padding: 12,
    marginTop: 15,
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold"
  },

  guide: {
    marginTop: 20,
    fontSize: 14,
    color: "#444"
  }
};