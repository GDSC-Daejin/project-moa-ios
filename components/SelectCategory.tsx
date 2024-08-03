import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { Colors, Size } from "../style/style";
import { useCategories } from "../hooks/useCategories";
import { deleteData } from "./util/deleteUtil";

type SelectCategoryProps = {
  setShowBox: (show: boolean) => void;
  updateCategories: (categories: { id: string; label: string }[]) => void;
};

export default function SelectCategory({
  setShowBox,
  updateCategories,
}: SelectCategoryProps) {
  const {
    categories,
    inputValue,
    loading,
    handleChange,
    handleAdd,
    setInputValue,
  } = useCategories();

  const handleAddCategory = async () => {
    try {
      await handleAdd();

      const newCategory = { id: `id_${Date.now()}`, label: inputValue };

      const currentCategories = Object.entries(categories).map(
        ([key, value]) => ({
          id: key,
          label: value,
        })
      );

      updateCategories([...currentCategories, newCategory]);
      setInputValue("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="카테고리를 입력해주세요"
        style={styles.inputContainer}
        keyboardType="default"
        maxLength={10}
        onChangeText={handleChange}
        value={inputValue}
      />
      <View style={styles.inputValue}>
        {Object.keys(categories).map((key) => (
          <View
            key={key}
            style={[
              styles.inputTextContainer,
              { minWidth: Math.min(500, key.length * 13) },
            ]}
          >
            <Text style={styles.inputText}>{categories[key]}</Text>
            <Pressable style={styles.closeSvg} onPress={deleteData}>
              <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <Path
                  d="M1 0.5L13 12.5M1 12.5L13 0.5L1 12.5Z"
                  stroke="#949494"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </Pressable>
          </View>
        ))}
      </View>
      <View style={styles.selectContainer}>
        <Pressable onPress={() => setShowBox(false)} style={styles.button}>
          {({ pressed }) => (
            <Text style={[styles.buttonText, pressed && styles.pressedText]}>
              취소
            </Text>
          )}
        </Pressable>
        <Pressable style={styles.button} onPress={handleAddCategory}>
          {({ pressed }) => (
            <Text style={[styles.buttonText, pressed && styles.pressedText]}>
              확인
            </Text>
          )}
        </Pressable>
      </View>
      {loading && <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: "40%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderStartStartRadius: 10,
    borderTopEndRadius: 10,
  },

  inputContainer: {
    bottom: 40,
    width: "80%",
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    padding: 24,
    borderRadius: 10,
  },

  selectContainer: {
    top: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },

  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },

  buttonText: {
    height: 40,
    textAlign: "center",
    fontSize: Size.body2Medium16,
    backgroundColor: Colors.MoaGray.gray200,
    color: Colors.MoaGray.gray400,
    lineHeight: 40,
  },

  pressedText: {
    backgroundColor: Colors.MoaCarrot.carrot700,
    color: "white",
  },

  inputValue: {
    width: "80%",
    top: 20,
    flexDirection: "row",
    gap: 10,
  },

  inputTextContainer: {
    flexDirection: "row",
    bottom: 40,
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "center",
  },

  inputText: {
    textAlign: "center",
    height: "100%",
  },

  closeSvg: {
    marginLeft: 10,
  },
});
