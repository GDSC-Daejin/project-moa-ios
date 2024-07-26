import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { saveCategory } from "../components/util/categoryUtils";

export const useCategories = () => {
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    const categoryDocRef = doc(db, "Category", "categories");
    const unsubscribe = onSnapshot(
      categoryDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setCategories(data?.Category ?? {});
        } else {
          setCategories({});
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching document: ", error);
        Alert.alert("데이터를 가져오는 중 오류 발생");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange = (e: string) => {
    setInputValue(e);
  };

  const handleAdd = async () => {
    if (inputValue.trim().length === 0) {
      Alert.alert("카테고리를 입력해주세요");
      return;
    }

    if (Object.keys(categories).length >= 1) {
      Alert.alert("카테고리는 하나만 추가할 수 있습니다.");
      return;
    }

    try {
      await saveCategory(inputValue);
      setInputValue("");
      setSaved(true);
      Alert.alert("데이터가 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("데이터 저장 중 오류 발생: ", error);
      Alert.alert("데이터 저장 중 오류가 발생했습니다.");
    }
  };

  return {
    categories,
    inputValue,
    loading,
    handleChange,
    handleAdd,
    setInputValue,
  };
};
