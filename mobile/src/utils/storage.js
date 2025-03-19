import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@CodeMentorStorage';

const storage = {
  // Save data to local storage
  saveData: async (key, value) => {
    try {
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      const data = existingData ? JSON.parse(existingData) : {};
      data[key] = value;
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data', error);
    }
  },

  // Retrieve data from local storage
  getData: async (key) => {
    try {
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      const data = existingData ? JSON.parse(existingData) : {};
      return data[key] || null;
    } catch (error) {
      console.error('Error retrieving data', error);
      return null;
    }
  },

  // Remove data from local storage
  removeData: async (key) => {
    try {
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      const data = existingData ? JSON.parse(existingData) : {};
      delete data[key];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error removing data', error);
    }
  },

  // Clear all data from local storage
  clearStorage: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  },
};

export default storage;