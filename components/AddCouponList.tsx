import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Colors, Size } from "../style/style";

export default function AddCouponList() {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      horizontal={true}
    >
      <View style={styles.scroll}>
        <Text>
          우리 {`\n`}
          가족방
        </Text>
        <Text style={styles.scrollBall}></Text>
        <Text style={styles.scrollBall}></Text>
        <Text style={styles.plusFont}>+2</Text>
      </View>
      <View style={styles.scroll}>
        <Text>거지방</Text>
        <Text style={styles.scrollBall}></Text>
        <Text style={styles.scrollBall}></Text>
        <Text style={styles.plusFont}>+9</Text>
      </View>
      <View style={styles.scroll}>
        <Text>친구방</Text>
        <Text style={styles.scrollBall}></Text>
        <Text style={styles.scrollBall}></Text>
        <Text style={styles.plusFont}>+2</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    gap: 12,
  },

  scroll: {
    backgroundColor: Colors.MoaGray.gray200,
    width: 150,
    height: 130,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 14,
    paddingLeft: 16,
    gap: 10,
  },

  scrollBall: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.MoaGray.gray300,
    overflow: "hidden",
  },

  plusFont: {
    fontSize: Size.body3Medium14,
    color: Colors.MoaGray.gray400,
  },
});
