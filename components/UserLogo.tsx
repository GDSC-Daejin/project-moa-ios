import { useEffect, useState } from "react";
import { Size } from "../style/style";
import { GetUserData } from "./GetUserData";
import MyPageDummyImg from "./logo/MyPageDummyImg";
import MyPageEditLogo from "./logo/MyPageEdit.Logo";
import { View, Image, Text, StyleSheet } from "react-native";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { KAKAO_API_KEY } from "@env";
import { UserData } from "../type/type";

export default function UserLogo({ isLoggedIn }: any) {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    initializeKakaoSDK(KAKAO_API_KEY);

    const fetchUserData = async () => {
      const data = await GetUserData();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.profileContainer}>
      <View style={styles.profile}>
        {isLoggedIn ? (
          <Image
            source={{ uri: userData?.thumbnailImageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <MyPageDummyImg />
        )}
        <MyPageEditLogo />
        {isLoggedIn ? (
          <Text style={styles.profileText}>{userData?.nickname}</Text>
        ) : (
          <Text style={styles.profileText}>로그인해주세요!</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    top: 20,
    height: 70,
  },

  profile: {
    display: "flex",
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },

  profileText: {
    fontSize: Size.title2Bold18,
    fontWeight: "bold",
  },
});
