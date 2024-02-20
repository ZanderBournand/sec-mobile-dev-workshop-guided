import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Checkbox({ isChecked, onCheck }) {
  const toggleCheck = () => {
    if (onCheck) onCheck();
  };

  return (
    <TouchableOpacity
      onPress={toggleCheck}
      style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: !isChecked && StyleSheet.hairlineWidth,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isChecked ? "#c7c7c7" : "#fff",
      }}
    >
      {isChecked && <Ionicons name="checkmark-sharp" size={20} color="white" />}
    </TouchableOpacity>
  );
}
