import { useCallback, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export default function TodoModal({
  todoInput,
  setTodoInput,
  handleAddTodo,
  bottomSheetModalRef,
}) {
  const inputRef = useRef(null);

  // Background whenever the modal is open
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        {...props}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={["25%"]}
      enableDismissOnClose
      backdropComponent={renderBackdrop}
      onChange={(index) => {
        if (index === 0) {
          inputRef.current?.focus();
        }
      }}
    >
      <View style={styles.modalContainer}>
        <BottomSheetTextInput
          ref={inputRef}
          style={styles.input}
          value={todoInput}
          onChangeText={setTodoInput}
          placeholder="Task Name"
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => bottomSheetModalRef.current?.dismiss()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <Ionicons name="add" size={25} color="white" />
            <Text style={styles.addButtonText}>Add task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "left",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  input: {
    width: "90%",
    padding: 10,
    fontSize: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  cancelButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "rgba(229, 229, 229, 0.8)", // 80% opacity
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#363636",
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#39485e",
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    paddingLeft: "3%",
  },
});
