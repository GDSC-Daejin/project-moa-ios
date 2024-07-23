import { StyleSheet, View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

export default function MyPageEditLogo() {
  return (
    <View style={styles.editLogo}>
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="12" fill="#C4320A" />
        <Path
          d="M14.475 8.36145L16.6358 10.518M15.3916 7.44663C15.6782 7.16066 16.0668 7 16.472 7C16.8773 7 17.2659 7.16066 17.5525 7.44663C17.839 7.73261 18 8.12047 18 8.5249C18 8.92933 17.839 9.3172 17.5525 9.60317L9.13885 18H7V15.8215L15.3916 7.44663Z"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  editLogo: {
    top: 14,
    right: 18,
  },
});
