import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Size } from "../style/style";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { CouponListParam, ListParam } from "../type/type";
import DayLogo from "../components/logo/DayLogo";
import AddCouponList from "../components/AddCouponList";
import { ScrollView, Switch, TextInput } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";

interface UserInfo {
  nickname: string;
}

export default function AddCouponConfirm() {
  const route = useRoute<RouteProp<CouponListParam, "AddCouponConfirm">>();
  const { coupons } = route.params;
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const navigation = useNavigation<StackNavigationProp<ListParam>>();

  const categoryList = [
    { id: "Category_starbucks", label: "스타벅스" },
    { id: "Category_oliveyoung", label: "올리브영" },
    { id: "Category_all", label: "편의점" },
    { id: "Category_plus", label: "+" },
  ];

  const selectedCategory = categoryList.find(
    (item) => item.label === coupons.category
  );

  useEffect(() => {
    const getUser = async () => {
      const getUserName = await AsyncStorage.getItem("user");

      if (!getUserName) {
        Alert.alert("유저가 없습니다!");
        return;
      } else {
        setUserInfo(JSON.parse(getUserName));
      }
    };

    getUser();
  }, []);

  const toggleSwitch = () => {
    Alert.alert("알림", "금액을 추가하겠습니까?", [
      {
        text: "네",
        onPress: () => {
          setShow(true);
        },
      },
      {
        text: "아니오",
        onPress: () => {
          setShow(false);
        },
      },
    ]);
  };

  const handleAdd = (inputText: string) => {
    setValue(inputText);
  };

  const handleSubmit = () => {
    Alert.alert("알림", "수정은 완료하셨나요?", [
      {
        text: "네",
        onPress: async () => {
          if (value.includes("원") === false) {
            Alert.alert("금액에 원 입력이 생략되었습니다!");
          }

          const userName = userInfo?.nickname;
          if (!userName) {
            Alert.alert("유저 정보가 없습니다!");
            return;
          }

          try {
            const docRef = doc(db, "coupons", userName);

            await updateDoc(docRef, {
              coupons: arrayUnion({
                category: coupons.category,
                img: coupons.img,
                couponName: coupons.couponName,
                period: coupons.period,
                price: value,
              }),
            });
            setTimeout(() => {
              navigation.navigate("Bottom", { screen: "Coupon" });
            }, 1000);
          } catch (e: any) {
            Alert.alert(e);
          }
        },
      },
      {
        text: "아니오",
        onPress: () => {},
      },
    ]);
  };

  const isPlusBtnHighlighted = !selectedCategory;

  const getStyleForCategory = (categoryId: string) => {
    if (categoryId === "Category_plus") {
      return isPlusBtnHighlighted ? styles.plusBtnSelected : styles.plusBtn;
    }
    return selectedCategory && selectedCategory.id === categoryId
      ? styles.categorySelectedBtn
      : styles.category;
  };

  if (!coupons) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.couponText}>추가된 쿠폰이 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.couponTitle}>
          <Text style={styles.title}>쿠폰 추가</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.coupon}>쿠폰</Text>
          <View style={styles.couponContainer}>
            {coupons.img && (
              <Image source={{ uri: coupons?.img }} style={styles.img} />
            )}
            <Text style={styles.couponText}>{coupons?.couponName}</Text>
          </View>
        </View>
        <View style={styles.periodContainer}>
          <Text style={styles.periodText}>유효기간</Text>
          <View style={styles.dayContainer}>
            <Text style={styles.periodBox}>{coupons?.period}</Text>
            <DayLogo />
          </View>
        </View>
        <View style={styles.categorySelect}>
          {categoryList.map(({ id, label }) => (
            <Pressable key={id}>
              <View style={getStyleForCategory(id)}>
                <Text
                  style={[
                    styles.categoryText,
                    id === "Category_plus"
                      ? styles.plusBtnText
                      : getStyleForCategory(id) === styles.categorySelectedBtn
                        ? styles.selectedText
                        : styles.defaultText,
                  ]}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
        <View style={styles.scroll}>
          <Text style={styles.periodText}>공유방</Text>
          <AddCouponList />
        </View>
        <View style={styles.moneyContainer}>
          <Text style={styles.periodText}>금액</Text>
          <Switch onValueChange={toggleSwitch} value={show} />
        </View>
        {show && (
          <View style={styles.boxContainer}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={handleAdd}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.selectButton,
              pressed && styles.pressed,
            ]}
          >
            {({ pressed }) => (
              <Text style={[styles.selectFont, pressed && styles.pressedText]}>
                취소
              </Text>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.selectButton,
              pressed && styles.pressed,
            ]}
            onPress={handleSubmit}
          >
            {({ pressed }) => (
              <Text style={[styles.selectFont, pressed && styles.pressedText]}>
                확인
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  titleContainer: {
    paddingHorizontal: 20,
    top: 20,
    height: 110,
    borderBottomWidth: 7,
    borderColor: Colors.MoaGray.gray100,
  },

  couponTitle: {
    borderBottomWidth: 1,
    borderColor: Colors.MoaGray.gray100,
    paddingBottom: 20,
  },

  title: {
    textAlign: "center",
    fontSize: Size.body2Medium16,
    fontWeight: "bold",
  },

  coupon: {
    fontSize: Size.body2Medium16,
  },

  couponText: {
    fontSize: 14,
    color: Colors.MoaGray.gray900,
  },

  couponContainer: {
    top: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  img: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },

  dayContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  periodContainer: {
    top: 40,
    paddingHorizontal: 20,
    gap: 14,
    paddingBottom: 40,
    borderBottomWidth: 7,
    borderColor: Colors.MoaGray.gray100,
  },

  periodText: {
    fontSize: Size.body2Medium16,
  },

  periodBox: {
    width: "100%",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    borderColor: Colors.MoaGray.gray300,
  },

  pressed: {
    backgroundColor: Colors.MoaCarrot.carrot700,
  },

  categorySelect: {
    top: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 10,
  },

  category: {
    width: 75,
    height: 35,
    lineHeight: 35,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    color: Colors.MoaGray.gray400,
    borderRadius: 100,
  },

  categorySelectedBtn: {
    width: 75,
    height: 35,
    lineHeight: 35,
    textAlign: "center",
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    backgroundColor: Colors.MoaCarrot.carrot700,
    borderRadius: 100,
  },

  plusBtn: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    justifyContent: "center",
    alignItems: "center",
  },

  plusBtnSelected: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    borderWidth: 1,
    borderColor: Colors.MoaCarrot.carrot700,
    backgroundColor: Colors.MoaCarrot.carrot700,
    justifyContent: "center",
    alignItems: "center",
  },

  plusBtnText: {
    fontSize: 25,
    bottom: 1,
  },

  categoryText: {
    textAlign: "center",
    lineHeight: 35,
    color: Colors.MoaGray.gray400,
    fontSize: Size.body2Medium16,
  },

  selectedText: {
    color: "white",
  },

  defaultText: {
    color: Colors.MoaGray.gray400,
  },

  scroll: {
    top: 90,
    paddingHorizontal: 20,
    borderBottomWidth: 6,
    paddingBottom: 20,
    borderColor: Colors.MoaGray.gray100,
  },

  moneyContainer: {
    top: 110,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  boxContainer: {
    top: 120,
    paddingHorizontal: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.MoaGray.gray300,
    borderRadius: 10,
    padding: 15,
  },

  buttonContainer: {
    top: 130,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  selectButton: {
    width: "48%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.MoaGray.gray200,
  },

  selectFont: {
    fontSize: Size.body2Medium16,
    color: Colors.MoaGray.gray400,
  },

  pressedText: {
    color: "white",
  },
});
