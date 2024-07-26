import { useState } from "react";
import { Pressable, StyleSheet, Text, View, ScrollView } from "react-native";
import { Colors, Size } from "../style/style";
import CategorySelector from "../components/CategorySelector";
import { Switch } from "react-native-gesture-handler";

export default function AddCoupon() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryList = [
    { id: "Category_all", label: "전체" },
    { id: "Category_starbucks", label: "스타벅스" },
    { id: "Category_oliveyoung", label: "올리브영" },
    { id: "Category_plus", label: "+" },
  ];

  const handleClick = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.title}>
          <Text style={styles.mainText}>쿠폰추가</Text>
        </View>
      </View>
      <View style={styles.addCouponImgContainer}>
        <Text style={styles.CouponFont}>쿠폰</Text>
        <Pressable>
          <Text style={[styles.CouponFont, styles.addCouponFont]}>
            + 이미지 추가하기
          </Text>
        </Pressable>
      </View>
      <CategorySelector
        categoryList={categoryList}
        selectedCategory={selectedCategory}
        onSelectCategory={handleClick}
      />
      <View style={styles.shareContainer}>
        <Text style={styles.CouponFont}>공유방</Text>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          horizontal={true}
        >
          <View style={styles.scroll}>
            <Text>
              우리 {`\n`}
              가족방
            </Text>
            <Text style={styles.scrollBall}></Text>
            <Text style={styles.scrollBall}></Text>
            <Text style={styles.plusFont}>+2</Text>
          </View>
          <View style={styles.scroll}>
            <Text>거지방</Text>
            <Text style={styles.scrollBall}></Text>
            <Text style={styles.scrollBall}></Text>
            <Text style={styles.plusFont}>+9</Text>
          </View>
          <View style={styles.scroll}>
            <Text>친구방</Text>
            <Text style={styles.scrollBall}></Text>
            <Text style={styles.scrollBall}></Text>
            <Text style={styles.plusFont}>+2</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.priceContainer}>
        <Text>금액</Text>
        <Switch />
      </View>
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
  },

  title: {
    paddingBottom: 12,
    borderBottomColor: Colors.MoaGray.gray100,
    borderBottomWidth: 1,
  },

  mainText: {
    fontSize: Size.body2Medium16,
    textAlign: "center",
    fontWeight: "bold",
  },

  addCouponImgContainer: {
    flexDirection: "row",
    width: "100%",
    top: 78,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomColor: Colors.MoaGray.gray100,
    borderBottomWidth: 7,
    paddingVertical: 30,
  },

  CouponFont: {
    fontSize: Size.body2Medium16,
  },

  addCouponFont: {
    color: Colors.MoaCarrot.carrot700,
  },

  shareContainer: {
    top: 128,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomColor: Colors.MoaGray.gray100,
    borderBottomWidth: 7,
  },

  scrollViewContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    gap: 12,
  },

  scroll: {
    backgroundColor: Colors.MoaGray.gray200,
    width: 150,
    height: 130,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 14,
    paddingLeft: 16,
    gap: 10,
  },

  scrollBall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.MoaGray.gray300,
    overflow: "hidden",
  },

  plusFont: {
    fontSize: Size.body3Medium14,
    color: Colors.MoaGray.gray400,
  },

  priceContainer: {
    top: 164,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
