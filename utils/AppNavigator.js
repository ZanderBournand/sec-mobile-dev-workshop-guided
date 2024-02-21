import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Todos from "../screens/Todos";
import Notes from "../screens/Notes";
import NoteEditor from "../screens/NoteEditor";

// Step 1 - part 1

// Step 1 - part 3

// Util function to build screen options for the bottom tab navigator
const getOptions = (barLabel, iconName, isHeaderShown) => ({
  tabBarIcon: ({ color, size }) => (
    <Ionicons name={iconName} size={size} color={color} />
  ),
  tabBarLabel: barLabel,
  headerShown: isHeaderShown,
});

// Stack navigation for the Notes and NoteEditor screens
const NotesStackScreen = () => {
  return {
    /* Step 1 - part 3 */
  };
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* Step 1 - part 1 */}
      {/* Step 1 - part 4 */}
    </NavigationContainer>
  );
}
