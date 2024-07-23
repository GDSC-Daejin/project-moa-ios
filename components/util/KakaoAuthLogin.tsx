import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { isLogined, login, me } from "@react-native-kakao/user";
import { BottomStackParams } from "../../type/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useKakaoAuthLogin = () => {
  const navigation = useNavigation<StackNavigationProp<BottomStackParams>>();
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isLoginSuccessful) {
      Alert.alert("로그인 성공", "로그인 성공했습니다", [
        {
          text: "확인",
          onPress: () => {
            timer = setTimeout(() => {
              navigation.navigate("Bottom", { screen: "HomeScreen" });
            }, 2000);
          },
        },
      ]);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isLoginSuccessful, navigation]);

  const KakaoAuthLogin = async () => {
    await login();

    if (await isLogined()) {
      const userData = await me();

      setIsLoginSuccessful(true);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    }
  };

  return KakaoAuthLogin;
};
