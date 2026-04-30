import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../styles/theme";
import { auth } from "../firebase/auth";
import { db } from "../firebase/db";
import { doc, updateDoc, setDoc } from "firebase/firestore";

export default function PaymentScreen({ navigation }) {
  const handlePayment = async () => {
    try {
      const user = auth.currentUser;

      // Save payment record
      await setDoc(doc(db, "payments", user.uid), {
        schoolId: user.uid,
        amount: 799,
        status: "pending",
        createdAt: new Date(),
      });

      // Update school status
      await updateDoc(doc(db, "schools", user.uid), {
        status: "pending"
      });

      alert("Payment submitted! Wait for admin approval.");

      navigation.replace("Auth");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unlock Your School</Text>

      <View style={styles.card}>
        <Text style={styles.price}>₹799</Text>
        <Text style={styles.desc}>
          One-time access to manage students, documents & AI verification
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.btnText}>Pay Now</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        * Demo payment. Admin will manually approve your account.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: "center",
    padding: 20
  },
  title: {
    color: COLORS.text,
    fontSize: 26,
    marginBottom: 20,
    textAlign: "center"
  },
  card: {
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30
  },
  price: {
    color: "#22c55e",
    fontSize: 32,
    fontWeight: "bold"
  },
  desc: {
    color: COLORS.subText,
    textAlign: "center",
    marginTop: 10
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  note: {
    color: "#888",
    marginTop: 10,
    textAlign: "center"
  }
});