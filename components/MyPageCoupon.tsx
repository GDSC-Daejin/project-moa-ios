import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors, Size } from "../style/style";

export default function MyPageCoupon() {
  return (
    <View style={styles.couponContainer}>
      <View style={styles.couponBox}>
        <Text style={styles.couponText}>내 쿠폰</Text>
        <Text style={styles.couponNum}>16개</Text>
      </View>
      <View style={styles.couponBox}>
        <Text style={styles.couponText}>사용가능 쿠폰</Text>
        <Text style={styles.couponNum}>10개</Text>
      </View>
      <View style={styles.couponBox}>
        <Text style={styles.couponText}>사용한 쿠폰</Text>
        <Text style={styles.couponNum}>6개</Text>
      </View>
    </View>
  );
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  couponContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    top: 20,
    paddingBottom: 40,
    borderBottomWidth: 7,
    borderColor: Colors.MoaGray.gray100,
  },

  couponBox: {
    top: 20,
    width: deviceWidth < 430 ? 110 : 125,
    height: 80,
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.MoaGray.gray200,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.MoaGray.gray200,
    shadowOpacity: 0.9,
    shadowRadius: 3.85,
  },

  couponText: {
    color: Colors.MoaGray.gray600,
  },

  couponNum: {
    color: Colors.MoaCarrot.carrot700,
    fontSize: Size.body1Medium18,
  },
});
