import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Todos from "../screens/Todos";
import Notes from "../screens/Notes";
import NoteEditor from "../screens/NoteEditor";

// Creates the navigator at the bottom of the screen (for the Todos and Notes screens)
const Tab = createBottomTabNavigator();
// Create the navigation stack between the Notes and NoteEditor screens
const NotesStack = createStackNavigator();

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
  return (
    <NotesStack.Navigator
      initialRouteName="Notes"
      screenOptions={{ headerStyle: { height: 100 } }}
    >
      <NotesStack.Screen name="Notes" component={Notes} />
      <NotesStack.Screen
        name="NoteEditor"
        component={NoteEditor}
        // Hide the header for the NoteEditor screen (implements a custom header in NoteEditor.js)
        options={{ headerShown: false }}
      />
    </NotesStack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* Bottom tab navigator for the Todos and Notes screens */}
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            height: 100,
          },
          tabBarActiveTintColor: "#39485e",
        }}
      >
        {/* Screen for the Todos component */}
        <Tab.Screen
          name="Todos"
          component={Todos}
          options={getOptions("Todos", "list", true)}
        />
        {/* Screen for the Notes section */}
        <Tab.Screen
          name="NotesStack"
          component={NotesStackScreen}
          options={getOptions("Notes", "document-text-outline", false)}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
