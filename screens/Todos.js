import { useCallback, useEffect, useRef, useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import TodoItem from "../components/TodoItem";
import TodoModal from "../components/TodoModal";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export default function Todos() {
  const [todos, setTodos] = useState(() => {
    loadFromStorage("todos").then((loadedTodos) => {
      setTodos(loadedTodos);
    });
    return [];
  });
  const [todoInput, setTodoInput] = useState("");
  const bottomSheetModalRef = useRef(null);

  useEffect(() => {
    saveToStorage(todos, "todos");
  }, [todos]);

  const handleAddTodo = () => {
    const newId = uuid.v4();

    setTodos((prevTodos) => [
      ...prevTodos,
      { id: newId, title: todoInput, completed: false },
    ]);

    setTodoInput("");
    bottomSheetModalRef.current?.dismiss();
  };

  const handlePresentModalPress = useCallback((platform) => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCheck = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
    });
  };

  const handleDeletion = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const sections = [
    { title: "Active", data: todos.filter((todo) => !todo.completed) },
    { title: "Completed", data: todos.filter((todo) => todo.completed) },
  ].filter((section) => section.data.length > 0);

  const emptyList = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Press the "+" button to get started</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item, section: { title } }) => (
          <TodoItem
            item={item}
            completed={title === "Completed"}
            onCheck={handleCheck}
            onDeletion={handleDeletion}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        contentContainerStyle={styles.itemList}
        SectionSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderSectionFooter={() => <View style={{ height: 50 }} />}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={emptyList}
      />
      <TodoModal
        todoInput={todoInput}
        setTodoInput={setTodoInput}
        handleAddTodo={handleAddTodo}
        bottomSheetModalRef={bottomSheetModalRef}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handlePresentModalPress}
      >
        <Ionicons name="add" size={25} color="white" />
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
  },
  itemList: {
    flexGrow: 1,
    paddingVertical: "5%",
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
});
