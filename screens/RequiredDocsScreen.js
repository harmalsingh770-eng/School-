import React, { useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Text, FlatList } from "react-native";
import { db } from "../firebase/db";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export default function RequiredDocsScreen({ route, navigation }) {
  const { studentId } = route.params;
  const [title, setTitle] = useState("");
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "requiredDocs"), (snap) => {
      setDocs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const addDocReq = async () => {
    await addDoc(collection(db, "requiredDocs"), { title });
    setTitle("");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Doc Name" onChangeText={setTitle} />
      <TouchableOpacity onPress={addDocReq}><Text>Add</Text></TouchableOpacity>

      <FlatList
        data={docs}
        keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("UploadDoc", { studentId, docId: item.id })}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}