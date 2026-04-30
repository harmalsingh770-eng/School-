import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { db } from "../firebase/db";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

export default function ReviewDocsScreen({ route }) {
  const { studentId, docId } = route.params;
  const [data, setData] = useState(null);

  useEffect(() => {
    const ref = doc(db, "students", studentId, "docs", docId);
    return onSnapshot(ref, (snap) => setData(snap.data()));
  }, []);

  const update = async (status) => {
    await updateDoc(doc(db, "students", studentId, "docs", docId), { status });
  };

  if (!data) return null;

  return (
    <View style={{ padding: 20 }}>
      <Text>{data.url}</Text>

      <TouchableOpacity onPress={() => update("approved")}>
        <Text>Approve</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => update("rejected")}>
        <Text>Reject</Text>
      </TouchableOpacity>
    </View>
  );
}