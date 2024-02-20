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
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    loadFromStorage("notes").then((loadedNotes) => {
      setNotes(loadedNotes);
    });
  }, []);

  useEffect(() => {
    if (notes) {
      saveToStorage(notes, "notes");
    }
  }, [notes]);

  useEffect(() => {
    const deletedNoteId = route.params?.deletedNoteId;
    if (deletedNoteId) {
      setNotes((prevNotes) =>
        prevNotes?.filter((note) => note.id !== deletedNoteId)
      );
    }
  }, [route.params?.deletedNoteId]);

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

  const emptyList = () => (
    <View style={styles.emptyContainer}>
      <Text>Press the "pencil" button to get started</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes?.sort((a, b) => b.lastModified - a.lastModified)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem item={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.listContentContainer}
        style={styles.listContainer}
        ListEmptyComponent={emptyList}
      />
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
