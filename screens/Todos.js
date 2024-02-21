import { useEffect, useRef, useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import TodoItem from "../components/TodoItem";
import TodoModal from "../components/TodoModal";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export default function Todos() {
  // State to keep track of the user's todos
  const [todos, setTodos] = useState([
    // Step 2 - part 10
    { id: uuid.v4(), task: "Buy groceries", completed: false },
    { id: uuid.v4(), task: "Do laundry", completed: false },
  ]);

  // Ref to the modal component -> allows us to present/dismiss the modal from the parent component
  const bottomSheetModalRef = useRef(null);

  // Step 2 - part 8

  // Step 2 - part 9

  // Callback function to handle the creation of a new todo (called from the TodoModal component)
  const handleAddTodo = (input) => {
    // Step 2 - part 5
  };

  // Callback function to handle the completion of a todo (called from the TodoItem component)
  const handleCheck = (id) => {
    // Step 2 - part 4
  };

  // Callback function to handle the deletion of a todo (called from the TodoItem component)
  const handleDeletion = (id) => {
    // Step 2 - part 4
  };

  // Step 2 - part 1

  // Step 2 - part 6

  return (
    <View style={styles.container}>
      {/* Step 2 - part 1 */}
      {/* Step 2 - part 3 */}
      {/* Step 2 - part 6 */}

      {/* Modal to create a new todo (called via button below) */}
      <TodoModal
        handleAddTodo={handleAddTodo}
        bottomSheetModalRef={bottomSheetModalRef}
      />
      {/* Button to create a new todo -> opens the modal */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => bottomSheetModalRef.current?.present()}
      >
        <Ionicons name="add" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "3%",
  },
  listContentContainer: {
    flexGrow: 1,
    paddingVertical: "5%",
  },
  sectionFooter: {
    height: 50,
  },
  addButton: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#39485e",
    borderRadius: 30,
    elevation: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
