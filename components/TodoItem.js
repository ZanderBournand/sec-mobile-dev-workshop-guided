import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "./Checkbox";

export default function TodoItem({ item, onCheck, onDeletion }) {
  return <View style={styles.todoItem}>{/* Step 2 - part 3 */}</View>;
}

const styles = StyleSheet.create({
  todoItem: {
    height: "5%",
    marginVertical: 5,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#c7c7c7",
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: "3%",
    paddingHorizontal: "5%",
  },
  todoText: {
    flex: 1,
    marginLeft: 15,
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
