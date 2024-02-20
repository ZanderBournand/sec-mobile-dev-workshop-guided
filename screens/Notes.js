import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import NoteItem from "../components/NoteItem";

export default function Notes({ route }) {
  const [notes, setNotes] = useState(() => {
    loadFromStorage("notes").then((loadedNotes) => {
      setNotes(loadedNotes);
    });
    return [];
  });

  useEffect(() => {
    saveToStorage(notes, "notes");
  }, [notes]);

  useEffect(() => {
    const deletedNoteId = route.params?.deletedNoteId;
    if (deletedNoteId) {
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== deletedNoteId)
      );
    }
  }, [route.params?.deletedNoteId]);

  useEffect(() => {
    const newNote = route.params?.newNote;
    setNotes((prevNotes) => {
      const existingNoteIndex = prevNotes.findIndex(
        (note) => note.id === newNote.id
      );

      if (existingNoteIndex !== -1) {
        // Note exists, update it
        return prevNotes.map((note, index) =>
          index === existingNoteIndex ? newNote : note
        );
      } else {
        // Note doesn't exist, add it
        return [...prevNotes, { ...newNote, id: uuid.v4() }];
      }
    });
  }, [route.params?.newNote]);

  const navigation = useNavigation();

  const emptyList = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Press the "pencil" button to get started</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes.sort((a, b) => b.lastModified - a.lastModified)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem item={item} navigation={navigation} />
        )}
        contentContainerStyle={{
          flex: 1,
          width: "85%",
          alignSelf: "center",
        }}
        style={{ width: "100%" }}
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
