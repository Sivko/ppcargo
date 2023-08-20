// import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Stack1 from "@/navigations/Stack1";
import Stack2 from "@/navigations/Stack2";
import Stack3 from "@/navigations/Stack3";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Принять места":
              // return <AntDesign name="dropbox" size={size} color={color} />;
              return <View></View>
            case "Сканировать рейсы":
              // return <AntDesign name="barcode" size={size} color={color} />;
              return <View></View>

            case "Настройки":
              // return <Ionicons name="options" size={size} color={color} />;
              return <View></View>
          }
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#207aff",
      })}
    >
      <Tab.Screen name="Принять места" component={Stack1} />
      <Tab.Screen name="Сканировать рейсы" component={Stack2} />
      <Tab.Screen name="Настройки" component={Stack3} />
    </Tab.Navigator>
  );
}
