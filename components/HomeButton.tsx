import { Pressable, StyleSheet, Text } from "react-native";
import { Colors, Size } from "../style/style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { LoginIntroParam } from "../type/type";
import { useEffect } from "react";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { KAKAO_API_KEY } from "@env";
import { isLogined } from "@react-native-kakao/user";

export default function HomeButton() {
  useEffect(() => {
    initializeKakaoSDK(KAKAO_API_KEY);
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<LoginIntroParam>>();

  const handleMove = async () => {
    const checkLogin = await isLogined();
    if (checkLogin) {
      return navigation.navigate("Bottom", { screen: "쿠폰" });
    }
    navigation.navigate("LoginIntro");
  };

  return (
    <Pressable
      style={({ pressed }) => (pressed ? styles.pressed : styles.button)}
      onPress={handleMove}
    >
      <Text style={styles.buttonText}>쿠폰 추가하기</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.MoaCarrot.carrot700,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
    alignItems: "center",
    cursor: "pointer",
  },

  pressed: {
    opacity: 0.8,
    backgroundColor: Colors.MoaCarrot.carrot700,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
    alignItems: "center",
    cursor: "pointer",
  },

  buttonText: {
    color: "white",
    fontSize: Size.body3Medium14,
  },
});
