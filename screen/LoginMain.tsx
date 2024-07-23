import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Size } from "../style/style";
import MainLogo from "../components/logo/MainLogo";
import KakaoLogo from "../components/logo/KakaoLogo";
import { useKakaoAuthLogin } from "../components/util/KakaoAuthLogin";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { KAKAO_API_KEY } from "@env";
import { useEffect } from "react";

export default function LoginMain() {
  useEffect(() => {
    initializeKakaoSDK(KAKAO_API_KEY);
  }, []);

  const KakaoAuthLogin = useKakaoAuthLogin();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MainLogo />
      <Pressable
        onPress={KakaoAuthLogin}
        style={({ pressed }) => [styles.kakao, pressed && styles.pressed]}
      >
        <View style={styles.svg}>
          <KakaoLogo />
        </View>
        <Text style={styles.text}>카카오톡으로 시작하기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  kakao: {
    width: "90%",
    height: 50,
    flexDirection: "row",
    backgroundColor: "#FAE300",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
    bottom: 50,
  },

  pressed: {
    opacity: 0.75,
  },

  svg: {
    right: 40,
  },

  text: {
    fontSize: Size.body2Medium16,
  },
});
