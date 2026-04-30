import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
  }, []);

  return (
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.container}>
      <Text style={styles.title}>School SaaS</Text>
      <Text style={styles.subtitle}>Smart Document System</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#ccc",
    marginTop: 10,
  },
});
