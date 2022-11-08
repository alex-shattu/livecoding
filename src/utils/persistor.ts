import AsyncStorage from '@react-native-async-storage/async-storage';

const save = (data: any, storageKey: string) => {
  AsyncStorage.setItem(storageKey, JSON.stringify(data));
};

const restore = async (defaultData = [], storageKey: string) => {
  try {
    const data = (await AsyncStorage.getItem(storageKey)) || '[]';
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
  return defaultData;
};

export default { save, restore };
