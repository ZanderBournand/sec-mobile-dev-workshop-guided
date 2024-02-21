import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default NoteItem = ({ item, navigation }) => {
  const date = new Date(item.lastModified);

  // Format the date to be more human-readable
  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Step 3 - part 2
  return <></>;
};

const styles = StyleSheet.create({
  noteItem: {
    height: 150,
    alignItems: "left",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#c7c7c7",
    paddingVertical: "5%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  noteTtitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  noteContent: {
    fontSize: 15,
    fontWeight: "300",
  },
  noteDate: {
    fontSize: 12,
    fontWeight: "300",
  },
});
