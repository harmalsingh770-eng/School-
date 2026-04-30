import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { db } from "../firebase/db";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { auth } from "../firebase/auth";

export default function ClassesScreen({ navigation }) {
  const [name, setName] = useState("");
  const [classes, setClasses] = useState([]);

  const schoolId = auth.currentUser.uid;

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
    await addDoc(collection(db, "classes"), {
      name,
      schoolId
    });
    setName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classes</Text>

      <TextInput
        placeholder="Class Name"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />

      <TouchableOpacity style={styles.btn} onPress={addClass}>
        <Text style={{ color: "#fff" }}>Add Class</Text>
      </TouchableOpacity>

      <FlatList
        data={classes}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Students", { classId: item.id })}
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
  title: { color: "#fff", fontSize: 24 },
  input: { backgroundColor: "#1e293b", color: "#fff", padding: 10, marginVertical: 10 },
  btn: { backgroundColor: "#6366f1", padding: 10 },
  card: { backgroundColor: "#1e293b", padding: 15, marginTop: 10 },
  text: { color: "#fff" }
});