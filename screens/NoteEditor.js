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
  // Step 3 - part 4
  // State to keep track of the user's input (both title and content of note)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Ref to control the scroll view (scroll to bottom, top, etc...)
  const scrollRef = useRef();

  // Function to be called when the user presses the "Done" button
  const handleSave = () => {
    // Step 3 - part 5
  };

  // Function to be called when the user presses the "trashcan" icon
  const handleDeletion = () => {
    // Step 3 - part 6
  };

  // Function to copy the note's content to the clipboard (uses Expo SDK's Clipboard module)
  const copyToClipboard = async () => {
    // Step 3 - part 7
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
      {/* Step 3 - part 3 */}
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
