import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function DayLogo() {
  return (
    <View style={styles.logo}>
      <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <Path
          d="M6 5V1M14 5V1M5 9H15M3 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H3C2.46957 3 1.96086 3.21071 1.58579 3.58579C1.21071 3.96086 1 4.46957 1 5V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19Z"
          stroke="#C4320A"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: "25%",
    left: "90%",
  },
});
