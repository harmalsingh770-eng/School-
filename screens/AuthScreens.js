import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../styles/theme";
import { auth } from "../firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase/db";
import { doc, setDoc, getDoc } from "firebase/firestore";

const ADMIN_EMAIL = "gurnek1911@gmail.com";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    let user;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      user = res.user;
    } catch {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      user = res.user;

      await setDoc(doc(db, "schools", user.uid), {
        email,
        status: "pending",
        createdAt: new Date()
      });
    }

    if (user.email === ADMIN_EMAIL) return navigation.replace("Admin");

    const snap = await getDoc(doc(db, "schools", user.uid));
    const data = snap.data();

    if (data.status === "pending") navigation.replace("Payment");
    else if (!data.schoolName) navigation.replace("Setup");
    else navigation.replace("Dashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>School SaaS</Text>

      <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />

      <TouchableOpacity style={styles.btn} onPress={handleAuth}>
        <Text style={styles.btnText}>Login / Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg, justifyContent: "center", padding: 20 },
  title: { color: "#fff", fontSize: 28, marginBottom: 20 },
  input: { backgroundColor: COLORS.card, padding: 12, marginBottom: 10, borderRadius: 10, color: "#fff" },
  btn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 10 },
  btnText: { color: "#fff", textAlign: "center" }
});