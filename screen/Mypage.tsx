import { StatusBar } from "expo-status-bar";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Size } from "../style/style";
import DropDownComponent from "../components/DropDown";
import { Switch } from "react-native-gesture-handler";
import UserLogo from "../components/UserLogo";
import MyPageCoupon from "../components/MyPageCoupon";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@react-native-kakao/user";

export default function MyPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userData = await AsyncStorage.getItem("user");
      setIsLoggedIn(!!userData);
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    if (isLoggedIn) {
      Alert.alert("알림", "로그아웃 하실건가요?", [
        {
          text: "네",
          onPress: async () => {
            await AsyncStorage.removeItem("user");
            await logout();
            setIsLoggedIn(false);
            Alert.alert("알림", "로그아웃 되었습니다.");
          },
        },
        {
          text: "아니오",
          onPress: () => {
            return;
          },
        },
      ]);
    } else {
      Alert.alert("알림", "로그인 상태가 아닙니다.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>MY</Text>
        </View>
        <UserLogo isLoggedIn={isLoggedIn} />
        <MyPageCoupon />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.pushContainer}>
          <View style={styles.pushAlarm}>
            <Text>푸시알림</Text>
            <Switch />
          </View>
          <DropDownComponent />
        </View>
      </View>
      <View style={styles.containers}>
        <Text>고객센터</Text>
      </View>
      <Pressable style={styles.containers} onPress={handleLogout}>
        <Text>로그아웃</Text>
      </Pressable>
      <View style={styles.bottomContainers}>
        <Text>회원탈퇴</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  image: {
    width: 30,
    height: 30,
  },

  topContainer: {
    top: "8%",
  },

  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: Colors.MoaGray.gray100,
    height: 40,
  },

  headerText: {
    fontSize: Size.body2Medium16,
    fontWeight: "bold",
  },

  edit: {
    position: "absolute",
    top: 40,
    left: 40,
  },

  infoContainer: {
    top: "13%",
    borderBlockColor: Colors.MoaGray.gray100,
    borderBottomWidth: 2,
    zIndex: 10,
  },

  dropDown: {
    borderWidth: 0,
  },

  pushContainer: {
    display: "flex",
    padding: 20,
  },

  pushAlarm: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  containers: {
    top: "10%",
    display: "flex",
    justifyContent: "center",
    borderBlockColor: Colors.MoaGray.gray100,
    borderBottomWidth: 2,
    height: "14%",
    paddingLeft: 20,
  },

  bottomContainers: {
    paddingLeft: 20,
    display: "flex",
    justifyContent: "center",
    top: "14%",
  },
});
