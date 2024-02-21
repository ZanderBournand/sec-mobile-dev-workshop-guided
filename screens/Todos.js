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
  const [todos, setTodos] = useState(null);
  // Ref to the modal component -> allows us to present/dismiss the modal from the parent component
  const bottomSheetModalRef = useRef(null);

  // Hook to load the todos from the device's storage when the screen is mounted
  useEffect(() => {
    loadFromStorage("todos").then((loadedTodos) => {
      setTodos(loadedTodos);
    });
  }, []);

  // Hook to save the todos to the device's storage whenever the todos changes (completed, create, delete)
  useEffect(() => {
    if (todos) {
      saveToStorage(todos, "todos");
    }
  }, [todos]);

  // Callback function to handle the creation of a new todo (called from the TodoModal component)
  const handleAddTodo = (input) => {
    const newTodo = {
      id: uuid.v4(),
      task: input,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // Callback function to handle the completion of a todo (called from the TodoItem component)
  const handleCheck = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    });
  };

  // Callback function to handle the deletion of a todo (called from the TodoItem component)
  const handleDeletion = (id) => {
    setTodos((prevTodos) => {
      return prevTodos?.filter((todo) => todo.id !== id);
    });
  };

  // Object that separates the todos into two sections: active and completed (passed to the SectionList component)
  const sections = [
    { title: "Active", data: todos?.filter((todo) => !todo.completed) },
    { title: "Completed", data: todos?.filter((todo) => todo.completed) },
  ].filter((section) => section.data?.length > 0);

  // Function to render an empty list message (if no todos)
  const emptyList = () => (
    <View style={styles.emptyContainer}>
      <Text>Press the "+" button to get started</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* List of todos */}
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        // What to render for each todo
        renderItem={({ item }) => (
          <TodoItem
            item={item}
            onCheck={handleCheck}
            onDeletion={handleDeletion}
          />
        )}
        // Rendering the title of the sections
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        contentContainerStyle={styles.listContentContainer}
        renderSectionFooter={() => <View style={styles.sectionFooter} />}
        ListEmptyComponent={emptyList}
        stickySectionHeadersEnabled={false}
      />
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
