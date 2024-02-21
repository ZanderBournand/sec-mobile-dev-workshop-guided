import {
  View,
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import uuid from "react-native-uuid";

export default function NoteEditor({ navigation, route }) {
  // Extract the note from the route's params (if it doesn't exist, its a new note being created)
  const note = route.params?.note;

  // State to keep track of the user's input (both title and content of note)
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  // Ref to control the scroll view (scroll to bottom, top, etc...)
  const scrollRef = useRef();

  // Function to be called when the user presses the "Done" button
  const handleSave = () => {
    const newNote = {
      id: note?.id || uuid.v4(),
      title,
      content,
      lastModified: Date.now(),
    };

    // Navigate back to the Notes screen, passing the new note as a parameter
    navigation.navigate("Notes", { newNote });
  };

  // Function to be called when the user presses the "trashcan" icon
  const handleDeletion = () => {
    // Navigate back to the Notes screen, passing the ID of the note to be deleted as a parameter
    navigation.navigate("Notes", note?.id && { deletedNoteId: note.id });
  };

  // Function to copy the note's content to the clipboard (uses Expo SDK's Clipboard module)
  const copyToClipboard = async () => {
    const noteString = `${title}\n\n${content}`;
    await Clipboard.setStringAsync(noteString);
  };

  return (
    <View style={styles.container}>
      {/* Header with action buttons */}
      <View style={styles.headerContainer}>
        {/* Save button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="checkmark-done" size={20} color="white" />
          <Text style={styles.saveButtonText}>Done</Text>
        </TouchableOpacity>
        <View style={styles.actionButtonsContainer}>
          {/* Delete ("trashcan") button*/}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeletion}
          >
            <Ionicons name="trash-outline" size={24} color="black" />
          </TouchableOpacity>
          {/* Copy button */}
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Ionicons name="copy-outline" size={24} color="black" />
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Scrollable view for the note editor */}
      <KeyboardAwareScrollView
        ref={scrollRef}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.editorContainer}
        // Ensures that the scroll view adjust itself as user types
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }
      >
        {/* Text input fields for the note's title */}
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
        />
        {/* Text input fields for the note's content */}
        <TextInput
          placeholder="Start typing here..."
          value={content}
          onChangeText={setContent}
          style={styles.contentInput}
          multiline
          scrollEnabled={false}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#d7d7d7",
  },
  saveButton: {
    marginLeft: "5%",
    backgroundColor: "#39485e",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
    paddingLeft: 5,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "5%",
    marginBottom: 10,
  },
  deleteButton: {
    marginRight: 15,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButtonText: {
    paddingLeft: 5,
  },
  editorContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    paddingTop: 100,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: "10%",
  },
  contentInput: {
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 150,
  },
});
