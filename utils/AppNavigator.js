import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Todos from "../screens/Todos";
import Notes from "../screens/Notes";
import NoteEditor from "../screens/NoteEditor";

const Tab = createBottomTabNavigator();
const NotesStack = createStackNavigator();

const getOptions = (barLabel, iconName, isHeaderShown) => ({
  tabBarIcon: ({ color, size }) => (
    <Ionicons name={iconName} size={size} color={color} />
  ),
  tabBarLabel: barLabel,
  tabBarActiveTintColor: "#39485e",
  headerShown: isHeaderShown,
  headerStyle: {
    height: 100, // Specify the height of the custom header
  },
});

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
        options={{ headerShown: false }}
      />
    </NotesStack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Todos"
          component={Todos}
          options={getOptions("Todos", "list", true)}
        />
        <Tab.Screen
          name="Todos2"
          component={NotesStackScreen}
          options={getOptions("Notes", "document-text-outline", false)}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
