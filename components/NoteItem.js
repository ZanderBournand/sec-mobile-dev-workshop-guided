import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default NoteItem = ({ item, navigation }) => {
  const date = new Date(item.lastModified);

  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <TouchableOpacity
      style={{
        height: 150,
        alignItems: "left",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#c7c7c7",
        paddingVertical: "5%",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onPress={() => navigation.navigate("NoteEditor", { note: item })}
    >
      <Text
        style={{ fontSize: 15, fontWeight: "600" }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.title}
      </Text>
      <Text
        style={{ fontSize: 15, fontWeight: "300" }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.content}
      </Text>
      <Text style={{ fontSize: 12, fontWeight: "300" }}>{formattedDate}</Text>
    </TouchableOpacity>
  );
};
