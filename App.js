import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AppNavigator from "./utils/AppNavigator";
import { StyleSheet } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.appContainer}>
      <BottomSheetModalProvider>
        <AppNavigator />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
