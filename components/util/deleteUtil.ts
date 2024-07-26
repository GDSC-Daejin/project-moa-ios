import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Alert } from "react-native";

export const deleteData = async () => {
  try {
    const docRef = doc(db, "Category", "categories");
    await updateDoc(docRef, {
      Category: [],
    });
    Alert.alert("삭제되었습니다");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
