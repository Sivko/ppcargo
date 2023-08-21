import Octicons from 'react-native-vector-icons/Octicons';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, Text, TouchableOpacity } from "react-native";

import DownloadFlights from "@/screens/screen2/DownloadFlights";
// import ModalScreen from "@/screens/screen2/ModalScreen";
import ModalScreen from "@/screens/screen2/ModalScreen";
import ScannerScreen from "@/screens/screen2/ScannerScreen";
import Slot from "@/screens/screen2/Slot";
import loadingStore from "@/stores/loadingStore";
import pressedStore from "@/stores/pressedStore";

const Screens = createNativeStackNavigator();

export function Stack2({ navigation }) {
  const { loading } = loadingStore();
  const { press, setPress } = pressedStore();
  return (
    <Screens.Navigator>
      <Screens.Screen
        name="Список рейсов"
        component={DownloadFlights}
        options={() => ({
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () =>
            press ? (
              <Button onPress={() => setPress(false)} title="Отмена" />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (loading) {
                    alert("Есть активная загрузка");
                  }
                  navigation.navigate("Загрузка");
                }}
                style={{ marginLeft: 10 }}
              >
                <Octicons name="download" size={24} color="#2196f3" />
              </TouchableOpacity>
            ),
          headerRight: () =>
            press ? (
              <Button
                title="Загрузить"
                disabled={loading}
                onPress={() => alert(123)}
              />
            ) : (
              <Button
                title="Сох в S2"
                disabled={loading}
                onPress={() => alert(123)}
              />
            ),
        })}
      />
      <Screens.Screen
        options={{ headerShown: false }}
        name="Scaner"
        component={ScannerScreen}
      />
      <Screens.Screen name="Загрузка" component={ModalScreen} />
      <Screens.Screen name="Место" component={Slot} />
    </Screens.Navigator>
  );
}

export default Stack2;
