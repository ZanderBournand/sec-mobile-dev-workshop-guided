import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Checkbox({ isChecked, onCheck }) {
  const toggleCheck = () => {
    if (onCheck) onCheck();
  };

  return (
    <TouchableOpacity
      onPress={toggleCheck}
      style={[
        styles.checkbox,
        isChecked ? styles.checkedBox : styles.uncheckedBox,
      ]}
    >
      {isChecked && <Ionicons name="checkmark-sharp" size={20} color="white" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#c7c7c7",
  },
  uncheckedBox: {
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
  },
});
