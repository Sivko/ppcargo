import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import FlightCard from "@/components/FlightCard";
import { timeout } from "@/requests/config";
import downloadFlightDeals from "@/requests/downloadFlightDeals";
import { getFlights } from "@/requests/flights";
import { getFlightDeals } from "@/requests/local/getSetFlights";
import pressedStore from "@/stores/pressedStore";

export default function DownloadFlights() {
  const { press, setPress } = pressedStore();
  const [checkedElement, setCheckedElement] = useState([]);

  useEffect(() => {
    setCheckedElement([0]);
  }, [press]);

  function hendlerCard(index) {
    setPress(true);
    setCheckedElement(prev => [!prev[0]]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          style={styles.card}
          onLongPress={() => hendlerCard(0)}
          delayLongPress={500}
        >
          <Text>1</Text>
          <View>
            <Text>Название: </Text>
            <Text>Кол-во мест: </Text>
            <Text>Статус: </Text>
            <Text>Создано: </Text>
          </View>
          <View>
            <Text>Название: </Text>
            <Text>Кол-во мест: </Text>
            <Text>Статус: </Text>
            <Text>Создано: </Text>
          </View>
          <View style={{ gap: 10 }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Feather name="upload-cloud" size={24} color="#2196f3" />
              <Text style={{ fontSize: 10 }}>Отпр: 0/10</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Feather name="download-cloud" size={24} color="#2196f3" />
              <Text style={{ fontSize: 10 }}>Загр: 0/10</Text>
            </View>
          </View>
          {press && (
            <View>
              {!checkedElement[0] === 0 && (
                <Feather name="circle" size={24} color="#ddd" />
              )}
              {checkedElement[0] === 0 && (
                <FontAwesome name="check-circle" size={24} color="#2196f3" />
              )}
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#ddd",
  },
  card: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#ddd",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
});
