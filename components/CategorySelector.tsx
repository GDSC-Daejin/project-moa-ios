import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Size } from "../style/style";

interface CategorySelectorProps {
  categoryList: { id: string; label: string }[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categoryList,
  selectedCategory,
  onSelectCategory,
}) => {
  const getStyleForCategory = (categoryId: string) => {
    switch (categoryId) {
      case "Category_plus":
        return styles.selectBtn;
      default:
        return styles.selectCategory;
    }
  };

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.CouponFont}>카테고리</Text>
      <View style={styles.selectContainer}>
        {categoryList.map(({ id, label }) => (
          <Pressable
            key={id}
            onPress={() => onSelectCategory(id)}
            style={[
              getStyleForCategory(id),
              selectedCategory === id && styles.pressedBtn,
            ]}
          >
            <View style={styles.select}>
              <Text
                style={[
                  styles.selectText,
                  selectedCategory === id && styles.pressedText,
                  id === "Category_plus" && styles.plusText,
                ]}
              >
                {label}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    width: "100%",
    top: 100,
    paddingHorizontal: 20,
    fontSize: Size.body2Medium16,
  },

  selectContainer: {
    top: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  selectCategory: {
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  pressedBtn: {
    backgroundColor: Colors.MoaCarrot.carrot700,
  },

  pressedText: {
    color: "white",
  },

  plusText: {
    fontSize: 25,
  },

  select: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  selectBtn: {
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 60,
    width: 45,
    height: 45,
    borderColor: Colors.MoaGray.gray300,
    color: Colors.MoaGray.gray400,
    justifyContent: "center",
    alignItems: "center",
  },

  selectText: {
    fontSize: Size.body2Medium16,
    color: Colors.MoaGray.gray400,
  },

  CouponFont: {
    fontSize: Size.body2Medium16,
  },
});

export default CategorySelector;
