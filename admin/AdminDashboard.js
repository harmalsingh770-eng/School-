import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { db } from "../firebase/db";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "schools"), (snap) => {
      setSchools(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const approve = async (id) => {
    await updateDoc(doc(db, "schools", id), {
      status: "approved",
      plan: "active"
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>

      <FlatList
        data={schools}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.email}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>

            {item.status !== "approved" && (
              <TouchableOpacity style={styles.btn} onPress={() => approve(item.id)}>
                <Text style={{ color: "#fff" }}>Approve</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617", padding: 20 },
  title: { color: "#fff", fontSize: 24, marginBottom: 10 },
  card: { backgroundColor: "#1e293b", padding: 15, marginBottom: 10, borderRadius: 10 },
  text: { color: "#fff" },
  btn: { backgroundColor: "#22c55e", padding: 10, marginTop: 10, borderRadius: 8 }
});