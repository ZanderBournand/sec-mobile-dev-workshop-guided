import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToStorage = async (data, type) => {
  try {
    const serializedData = JSON.stringify(data);
    await AsyncStorage.setItem(type, serializedData);
  } catch (error) {
    console.error(`Failed to save ${type}:`, error);
  }
};

export const loadFromStorage = async (type) => {
  try {
    const serializedData = await AsyncStorage.getItem(type);
    if (serializedData === null) {
      return [];
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Failed to load ${type}:`, error);
  }
};
