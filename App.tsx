import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "./tabs/Stack";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack />
    </NavigationContainer>
  );
}
