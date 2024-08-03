import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors, Size } from "../style/style";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CouponListParam } from "../type/type";
import * as Crypto from "expo-crypto";

interface ModalProps {
  downloadUrl: string | null;
  setShow: (show: boolean) => void;
  ocrData: any;
}

interface UserInfo {
  nickname: string;
}

const extractUniqueInferTexts = (fields: any[]) => {
  const textSet: Set<string> = new Set();

  fields.map((item: any) => {
    if (item.inferText) {
      textSet.add(item.inferText);
    }
  });

  return Array.from(textSet);
};

const extractCouponData = (ocrData: any, downloadUrl: string | null) => {
  let couponData: any[] = [];
  const newCouponId = Crypto.randomUUID();

  if (ocrData && ocrData.fields) {
    const uniqueTexts = extractUniqueInferTexts(ocrData.fields);
    const findNumber = uniqueTexts.findIndex((text) => /^\d/.test(text));

    if (findNumber !== -1) {
      const title = uniqueTexts.slice(0, findNumber).join(" ");
      const couponNumber = uniqueTexts.slice(findNumber, -1);

      const findFilterNumber = couponNumber.filter((text: string) =>
        /^\d+$/.test(text)
      );
      const period = uniqueTexts.findIndex((text) => text.includes("유효기간"));

      const realPeriod = uniqueTexts.slice(period + 1, period + 3);

      const category = uniqueTexts.slice(0, 1);

      couponData.push({
        couponName: title,
        couponNumber: findFilterNumber.join(" "),
        img: downloadUrl,
        id: newCouponId,
        category: category.join(""),
        period: realPeriod.join(" "),
      });
    }
  }

  return couponData;
};

export default function Modal({ downloadUrl, setShow, ocrData }: ModalProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigation = useNavigation<StackNavigationProp<CouponListParam>>();

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUserInfo(JSON.parse(userData));
      }
    };

    getUser();
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = async () => {
    const userName = userInfo?.nickname;

    if (!userName) {
      Alert.alert("사용자 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      const userRef = doc(db, "coupons", userName);

      const userDoc = await getDoc(userRef);
      const existingData = userDoc.exists() ? userDoc.data() : { coupons: [] };
      const newCoupons = extractCouponData(ocrData, downloadUrl);

      const updatedCoupons = [...(existingData.coupons || []), ...newCoupons];

      await setDoc(userRef, { coupons: updatedCoupons });

      Alert.alert("성공", "곧 이동합니다", [
        {
          text: "확인",
          onPress: () => {
            const mostRecentCoupon = updatedCoupons[updatedCoupons.length - 1];
            navigation.navigate("AddCouponConfirm", {
              coupons: mostRecentCoupon,
            });
          },
        },
      ]);
    } catch (e: any) {
      Alert.alert("에러가 났습니다");
    }
  };

  let uniqueTexts = [];
  let title: any = [];
  let couponNumber: any = [];

  if (ocrData && ocrData.fields) {
    uniqueTexts = extractUniqueInferTexts(ocrData.fields);
    const findNumber = uniqueTexts.findIndex((text) => /^\d/.test(text));

    if (findNumber !== -1) {
      title = uniqueTexts.slice(1, findNumber);
      couponNumber = uniqueTexts.slice(findNumber, -1);
    } else {
      title = uniqueTexts;
    }
  }

  const findFilterNumber = couponNumber.filter((text: string) =>
    /^\d+$/.test(text)
  );

  const titlePlaceholder = title.length > 0 && title.join(" ");
  const couponNumberPlaceHolder =
    findFilterNumber.length > 0 && findFilterNumber.join(" ");

  return (
    <View style={styles.overlay}>
      <View style={styles.overlayContent}>
        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.topFont}>
              쿠폰 정보가 다르다면 수정해보세요!
            </Text>
            <Text style={styles.bottomFont}>
              선택하신 쿠폰 정보가 {`\n`} 일치한가요?
            </Text>
          </View>
          {downloadUrl && (
            <Image source={{ uri: downloadUrl }} style={styles.downLoadImg} />
          )}
        </View>
        <View style={styles.inputContainers}>
          <View style={styles.inputContainer}>
            <Text>쿠폰 이름</Text>
            <TextInput
              placeholder={titlePlaceholder}
              style={styles.textInput}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>쿠폰 번호</Text>
            <TextInput
              placeholder={couponNumberPlaceHolder}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={handleClose}
          >
            {({ pressed }) => (
              <Text style={[pressed && styles.pressedText]}>취소</Text>
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={handleOpen}
          >
            {({ pressed }) => (
              <Text style={[pressed && styles.pressedText]}>확인</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  overlayContent: {
    backgroundColor: "white",
    borderStartStartRadius: 20,
    borderStartEndRadius: 20,
    height: "60%",
    width: "100%",
    top: "30%",
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 32,
  },

  topFont: {
    fontSize: Size.body3Medium14,
    color: Colors.MoaGray.gray400,
  },

  bottomFont: {
    fontSize: Size.body1Medium18,
    color: Colors.MoaGray.gray800,
    fontWeight: "bold",
  },

  downLoadImg: {
    width: 120,
    height: 120,
    borderRadius: 6,
  },

  inputContainers: {
    gap: 20,
  },

  inputContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },

  textInput: {
    backgroundColor: Colors.MoaGray.gray100,
    padding: 15,
    fontSize: Size.body2Medium16,
    color: Colors.MoaGray.gray600,
  },

  buttonsContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    flexDirection: "row",
    gap: 10,
  },

  button: {
    width: "50%",
    backgroundColor: Colors.MoaGray.gray200,
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    borderRadius: 10,
  },

  pressed: {
    backgroundColor: Colors.MoaCarrot.carrot700,
  },

  pressedText: {
    color: "white",
  },
});
