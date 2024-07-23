import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Size } from "../style/style";
import { FlatList } from "react-native-gesture-handler";
import SelectCategory from "../components/SelectCategory";
import { app } from "../firebaseConfig";

export default function Coupon() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);
  const [showBox, setShowBox] = useState(false);

  const a = app;
  console.log(a);

  const topData = [
    { id: "top_all", label: "전체" },
    { id: "top_available", label: "사용가능" },
    { id: "top_completed", label: "사용완료" },
  ];

  const bottomData = [
    { id: "bottom_plus", label: "+" },
    { id: "bottom_all", label: "전체" },
    { id: "bottom_starbucks", label: "스타벅스" },
    { id: "bottom_oliveyoung", label: "올리브영" },
  ];

  const handlePress = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleAdd = () => {
    setShowBox(true);
  };

  const getStyleForCategory = (categoryId: string) => {
    switch (categoryId) {
      case "bottom_plus":
        return styles.selectBtn;
      case "bottom_all":
      case "bottom_starbucks":
      case "bottom_oliveyoung":
        return styles.selectCategory;
      default:
        return styles.defaultCategory;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.subContainer}>
        <Text style={styles.mainText}>보관함</Text>
        <View style={styles.category}>
          {topData.map(({ id, label }) => (
            <Pressable
              key={id}
              style={[
                styles.categoryTextContainer,
                selectedCategory === id && styles.pressed,
              ]}
              onPress={() => handlePress(id)}
            >
              <Text style={styles.categoryText}>{label}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.selectContainer}>
          {bottomData.map(({ id, label }) => (
            <Pressable
              key={id}
              onPress={() => handlePress(id)}
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
                    id === "bottom_plus" && styles.plusText,
                  ]}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          ))}
          {/* <FlatList data={data} renderItem={renderItem} /> */}
        </View>
      </View>
      <Pressable
        style={({ pressed }) => (pressed ? styles.click : undefined)}
        onPress={handleAdd}
      >
        {showBox ? (
          <SelectCategory setShowBox={setShowBox} />
        ) : (
          <View style={styles.addCouponContainer}>
            <View style={styles.addCoupon}>
              <Text style={styles.addCouponText}>쿠폰 추가하기</Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  subContainer: {
    top: 70,
    flex: 1,
  },

  mainText: {
    fontSize: Size.body2Medium16,
    textAlign: "center",
    fontWeight: "bold",
  },

  category: {
    top: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  categoryTextContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.MoaGray.gray300,
  },

  pressed: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.MoaCarrot.carrot700,
  },

  categoryText: {
    fontSize: Size.body2Medium16,
  },

  selectContainer: {
    top: 50,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    color: Colors.MoaGray.gray600,
    justifyContent: "center",
    alignItems: "center",
  },

  selectAll: {
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  selectCategory: {
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  selectText: {
    fontSize: Size.body2Medium16,
  },

  plusText: {
    fontSize: 25,
  },

  defaultCategory: {
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

  containers: {
    flex: 1,
  },

  addCouponContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  addCoupon: {
    bottom: 14,
    backgroundColor: Colors.MoaCarrot.carrot700,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  addCouponText: {
    color: "white",
  },

  click: {
    opacity: 0.5,
  },
});
