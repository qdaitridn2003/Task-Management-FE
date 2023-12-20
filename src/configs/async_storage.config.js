import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorageGetItem = async (key) => {
    try {
        const result = await AsyncStorage.getItem(key);
        return result;
    } catch (error) {
        console.log('Async Storage Get Item:', error);
    }
};

export const asyncStorageSetItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('Async Storage Set Item:', error);
    }
};

export const asyncStorageSetMultiItem = async (keyAndValue) => {
    try {
        await AsyncStorage.multiSet(keyAndValue);
    } catch (error) {
        console.log('Async Storage Set Multi Item:', error);
    }
};

export const asyncStorageClearItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('Async Storage Remove Item:', error);
    }
};

export const asyncStorageClearAllItem = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log('Async Storage Clear Items:', error);
    }
};
