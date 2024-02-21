import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import NoteItem from "../components/NoteItem";
import uuid from "react-native-uuid";

export default function Notes({ navigation, route }) {
  // State to keep track of the user's notes
  const [notes, setNotes] = useState([
    // Step 3 - part 10
    {
      id: uuid.v4(),
      title: "Grocery List",
      content: "Milk, eggs, bread",
      lastModified: Date.now(),
    },
    {
      id: uuid.v4(),
      title: "Meeting Notes",
      content: "Discuss Q3 goals",
      lastModified: Date.now(),
    },
  ]);

  // Step 3 - part 9

  // Step 3 - part 5

  // Step 3 - part 6

  // Step 3 - part 8

  return (
    <View style={styles.container}>
      {/* Step 3 - part 1 */}
      {/* Step 3 - part 2 */}
      {/* Step 3 - part 8 */}

      {/* Button to create a new note -> navigates to NoteEditor screen */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("NoteEditor")}
      >
        <Ionicons name="pencil" size={25} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    width: "100%",
  },
  listContentContainer: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
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
