import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem("user");
    if (userData !== null) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch user data from AsyncStorage", error);
    return null;
  }
};
