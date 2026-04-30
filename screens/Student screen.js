import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../firebase/db";
import { collection, onSnapshot } from "firebase/firestore";

export default function StudentsScreen({ route, navigation }) {
  const { classId } = route.params;
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "students"), (snap) => {
      setStudents(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .filter(s => s.classId === classId)
      );
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("AddStudent", { classId })}>
        <Text style={styles.add}>+ Add Student</Text>
      </TouchableOpacity>

      <FlatList
        data={students}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("RequiredDocs", { studentId: item.id })}
          >
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#020617", padding: 20 },
  add: { color: "#22c55e", marginBottom: 10 },
  card: { backgroundColor: "#1e293b", padding: 15, marginTop: 10 },
  text: { color: "#fff" }
});