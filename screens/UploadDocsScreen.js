import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { db } from "../firebase/db";
import { doc, setDoc } from "firebase/firestore";

export default function UploadDocScreen({ route }) {
  const { studentId, docId } = route.params;
  const [link, setLink] = useState("");

  const submit = async () => {
    if (!link.includes("drive.google.com")) return alert("Invalid link");

    await setDoc(doc(db, "students", studentId, "docs", docId), {
      url: link,
      status: "pending"
    });

    alert("Uploaded");
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Paste Drive link" onChangeText={setLink} />
      <TouchableOpacity onPress={submit}><Text>Submit</Text></TouchableOpacity>
    </View>
  );
}