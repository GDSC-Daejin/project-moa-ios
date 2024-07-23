import { StyleSheet, View } from "react-native";
import { Colors } from "../style/style";
import LoginLogo from "../components/logo/LoginLogo";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoginIntroParam } from "../type/type";

export default function LoginIntro() {
  const navigation = useNavigation<StackNavigationProp<LoginIntroParam>>();

  useEffect(() => {
    const nextStep = setTimeout(() => {
      navigation.navigate("LoginMain");
    }, 1000);

    return () => clearTimeout(nextStep);
  }, []);

  return (
    <View style={styles.container}>
      <LoginLogo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.MoaCarrot.carrot700,
    justifyContent: "center",
    alignItems: "center",
  },
});
