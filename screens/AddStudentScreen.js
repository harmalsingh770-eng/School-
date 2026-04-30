import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { db } from "../firebase/db";
import { collection, addDoc } from "firebase/firestore";

export default function AddStudentScreen({ route, navigation }) {
  const { classId } = route.params;

  const [name, setName] = useState("");

  const add = async () => {
    await addDoc(collection(db, "students"), {
      name,
      classId
    });
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Student Name" onChangeText={setName} />
      <TouchableOpacity onPress={add}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
}