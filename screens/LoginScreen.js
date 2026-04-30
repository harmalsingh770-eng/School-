import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const ADMIN_EMAIL = "your@email.com";

export default function LoginScreen({ navigation }) {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.email === ADMIN_EMAIL) {
        navigation.replace("Admin");
      } else {
        navigation.replace("SchoolSetup");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#6366f1",
    padding: 15,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
