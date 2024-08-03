import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from "react-native";
import { Colors, Size } from "../style/style";
import SelectCategory from "../components/SelectCategory";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AddCouponParam } from "../type/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface UserInfo {
  nickname: string;
}

export default function Coupon() {
  const [selectedCategory, setSelectedCategory] = useState("top_all");
  const [data, setData] = useState<any[]>([]);
  const [showBox, setShowBox] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [bottomData, setBottomData] = useState([
    { id: "bottom_plus", label: "+" },
    { id: "bottom_all", label: "전체" },
    { id: "bottom_starbucks", label: "스타벅스" },
    { id: "bottom_oliveyoung", label: "올리브영" },
  ]);

  const navigation = useNavigation<StackNavigationProp<AddCouponParam>>();

  const topData = [
    { id: "top_all", label: "전체" },
    { id: "top_available", label: "사용가능" },
    { id: "top_completed", label: "사용완료" },
  ];

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        Alert.alert("로그인 해주세요!");
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUserInfo(parsedUser);

      const docRef = doc(db, "coupons", parsedUser.nickname);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const documentData = docSnap.data();
          if (documentData && Array.isArray(documentData.coupons)) {
            setData(documentData.coupons);
          } else {
            setData([]);
          }
        } else {
          console.log("No such document!");
          setData([]);
        }
      } catch (error) {
        console.error("Error getting document:", error);
        setData([]);
      }
    };

    getUser();
  }, []);

  const handlePress = (categoryId: string) => {
    if (categoryId === "bottom_plus") {
      setShowBox(true);
      setSelectedCategory("");
    } else {
      setSelectedCategory(categoryId);
      setShowBox(false);
    }
  };

  const handleAdd = () => {
    navigation.navigate("AddCoupon");
  };

  const getStyleForCategory = (categoryId: string) => {
    switch (categoryId) {
      case "bottom_plus":
        return [styles.selectBtn, showBox && styles.pressedClick];
      case "bottom_all":
      case "bottom_starbucks":
      case "bottom_oliveyoung":
        return styles.selectCategory;
      default:
        return styles.defaultCategory;
    }
  };

  const filteredData = data.filter((item) => {
    if (selectedCategory === "bottom_all") {
      return true;
    }
    const selectedLabel = bottomData.find((cat) => cat.id === selectedCategory)
      ?.label;
    return selectedLabel ? item.category === selectedLabel : true;
  });

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.cardImg} />
      <Text style={styles.cardText}>{item.category}</Text>
      <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
        {item.couponName}
      </Text>
    </View>
  );

  const updateCategories = (newCategories: { id: string; label: string }[]) => {
    setBottomData((prevCategories) => {
      const existingIds = new Set(prevCategories.map((cat) => cat.id));
      const updatedCategories = [...prevCategories];

      newCategories.map((cat) => {
        if (!existingIds.has(cat.id)) {
          updatedCategories.push(cat);
        }
      });

      return updatedCategories;
    });
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
                    id === "bottom_plus" &&
                      (showBox ? styles.plusTextShowBox : styles.plusText),
                  ]}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View style={styles.dataContainer}>
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.row}
          />
        </View>
      </View>
      {showBox && <View style={styles.overlay} />}
      <Pressable
        style={({ pressed }) => (pressed ? styles.click : undefined)}
        onPress={handleAdd}
      >
        {showBox ? (
          <SelectCategory
            setShowBox={setShowBox}
            updateCategories={updateCategories}
          />
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
    color: Colors.MoaGray.gray600,
  },

  plusTextShowBox: {
    fontSize: 25,
    color: "white",
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

  pressedClick: {
    backgroundColor: Colors.MoaCarrot.carrot700,
    color: "white",
  },

  pressedText: {
    color: "white",
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

  dataContainer: {
    paddingHorizontal: 20,
    top: 70,
    flex: 1,
  },

  card: {
    flex: 1,
    height: 180,
    borderRadius: 8,
    marginTop: 24,
    gap: 8,
  },

  cardImg: {
    width: "100%",
    height: "80%",
    borderRadius: 10,
  },

  cardText: {
    fontSize: Size.body4Medium12,
    color: Colors.MoaGray.gray400,
  },

  cardTitle: {
    fontSize: Size.body3Medium14,
  },

  row: {
    justifyContent: "space-between",
    gap: 10,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    zIndex: 0, // Ensures the overlay is behind the modal
  },
});
