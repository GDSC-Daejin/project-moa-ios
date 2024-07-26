import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import { Colors, Size } from "../style/style";
import { useCategories } from "../hooks/useCategories";
import { deleteData } from "./util/deleteUtil";

type SelectCategoryProps = {
  setShowBox: (show: boolean) => void;
};

export default function SelectCategory({ setShowBox }: SelectCategoryProps) {
  const {
    categories,
    inputValue,
    loading,
    handleChange,
    handleAdd,
    setInputValue,
  } = useCategories();

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
        <Pressable style={styles.button} onPress={handleAdd}>
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
    height: "20%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
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
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    borderRadius: 100,
    padding: 10,
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
