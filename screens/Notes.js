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

export default function Notes({ navigation, route }) {
  // State to keep track of the user's notes
  const [notes, setNotes] = useState(null);

  // Hook to load the notes from the device's storage when the screen is mounted
  useEffect(() => {
    loadFromStorage("notes").then((loadedNotes) => {
      setNotes(loadedNotes);
    });
  }, []);

  // Hook to save the notes to the device's storage whenever the notes changes (create, update, delete)
  useEffect(() => {
    if (notes) {
      saveToStorage(notes, "notes");
    }
  }, [notes]);

  // Hook to handle the deletion of a note (received via params from the NoteEditor screen)
  useEffect(() => {
    const deletedNoteId = route.params?.deletedNoteId;
    if (deletedNoteId) {
      setNotes((prevNotes) =>
        prevNotes?.filter((note) => note.id !== deletedNoteId)
      );
    }
  }, [route.params?.deletedNoteId]);

  // Hook to handle the creation or update of a note (received via params from the NoteEditor screen)
  useEffect(() => {
    const newNote = route.params?.newNote;
    if (newNote) {
      setNotes((prevNotes) => {
        const noteExists = prevNotes.some((note) => note.id === newNote.id);
        if (noteExists) {
          return prevNotes.map((note) =>
            note.id === newNote.id ? newNote : note
          );
        } else {
          return [...prevNotes, newNote];
        }
      });
    }
  }, [route.params?.newNote]);

  // Function to render an empty list message (if no notes)
  const emptyList = () => (
    <View style={styles.emptyContainer}>
      <Text>Press the "pencil" button to get started</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* List of notes */}
      <FlatList
        // Sort the notes by last modified date
        data={notes?.sort((a, b) => b.lastModified - a.lastModified)}
        keyExtractor={(item) => item.id}
        // What to render for each note
        renderItem={({ item }) => (
          <NoteItem item={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.listContentContainer}
        style={styles.listContainer}
        ListEmptyComponent={emptyList}
      />
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
