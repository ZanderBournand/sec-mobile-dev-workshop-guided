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
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

export default function NoteEditor({ route }) {
  const note = route.params?.note;

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const scrollRef = useRef();

  const navigation = useNavigation();

  const handleSave = () => {
    const newNote = {
      ...note,
      title,
      content,
      lastModified: Date.now(),
    };

    navigation.navigate("Notes", { newNote });
  };

  const handleDeletion = () => {
    navigation.navigate("Notes", { deletedNoteId: note.id });
  };

  const copyToClipboard = async () => {
    const noteString = `${title}\n\n${content}`;
    await Clipboard.setStringAsync(noteString);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons name="checkmark-done" size={20} color="white" />
          <Text style={styles.saveButtonText}>Done</Text>
        </TouchableOpacity>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeletion}
          >
            <Ionicons name="trash-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Ionicons name="copy-outline" size={24} color="black" />
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAwareScrollView
        ref={scrollRef}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.editorContainer}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }
      >
        <TextInput
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
        />
        <TextInput
          placeholder="Start typing here..."
          value={content}
          onChangeText={setContent}
          style={styles.contentInput}
          multiline
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "white",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    paddingTop: 100, // Add padding to account for the header
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: "10%",
  },
  contentInput: {
    fontSize: 16,
    fontWeight: "300",
    height: "100%",
  },
});
