import { createStackNavigator } from "@react-navigation/stack";
import BottomStack from "./BottomStack";
import LoginMain from "../screen/LoginMain";
import LoginIntro from "../screen/LoginIntro";
import { RootStackParam } from "../type/type";

export default function Stack() {
  const Stack = createStackNavigator<RootStackParam>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bottom"
        component={BottomStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginIntro"
        component={LoginIntro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginMain"
        component={LoginMain}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}