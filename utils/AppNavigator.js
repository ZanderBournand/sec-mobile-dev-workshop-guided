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
  headerShown: isHeaderShown,
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
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            height: 100,
          },
          tabBarActiveTintColor: "#39485e",
        }}
      >
        <Tab.Screen
          name="Todos"
          component={Todos}
          options={getOptions("Todos", "list", true)}
        />
        <Tab.Screen
          name="NotesStack"
          component={NotesStackScreen}
          options={getOptions("Notes", "document-text-outline", false)}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
