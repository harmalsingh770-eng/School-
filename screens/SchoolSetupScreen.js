import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SchoolSetupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Your School</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
  },
});
