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
  TextInput,
} from "react-native";

import pressedStore from "@/stores/pressedStore";
import scanStore from '@/stores/scanStore';
import { fields } from '@/requests/config';

export default function DownloadFlights() {
  const { scanItems, getStoragescanItems } = scanStore();
  const { press, setPress } = pressedStore();
  const [checkedElements, setCheckedElements] = useState([]);

  useEffect(() => {
    getStoragescanItems();
    setCheckedElements([]);
  }, [press]);


  function hendlerCard(index) {
    setPress(true);
    // setCheckedElements(prev => [!prev[0]]);
  }
  function hendlerClickCard(index, scanItems) {
    if (!press)
      console.log("!press Click")
    if (press) {
      // console.log("press Click")
      if (checkedElements.includes(scanItems[index].flight.data.id)) {
        setCheckedElements(prev => prev.filter(e => e !== scanItems[index].flight.data.id))
      } else {
        setCheckedElements(prev => [...prev, scanItems[index].flight.data.id])
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {scanItems?.map((e, index) => (
          <View key={Math.random()}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => hendlerClickCard(index, scanItems)}
              onLongPress={() => hendlerCard(index, scanItems)}
              delayLongPress={500}
            >
              <Text>{index + 1}</Text>
              <View>
                <Text>{e.flight.data.attributes.name}</Text>
                <Text>Код. кл: {e.flight.data?.attributes?.customs[fields["clientCode"]]}</Text>
                <Text>Транспорт: {e.flight.data?.attributes?.customs[fields["transport"]]}</Text>
              </View>
              <View>
                <Text>Кол-во мест: {e?.slots?.filter((e) => e.data.id)?.length}</Text>
                <Text>Ошибок: {e?.slots?.filter((e) => e.newData.attributes.customs[fields["scanTSD"] === "Ошибка"])?.length}</Text>
                <Text>Статус: {e?.flight.data?.attributes?.customs[fields["scanTSD"]]}</Text>
              </View>
              <View style={{ gap: 10 }}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  {e?.slots?.filter((e) => e.newData.id)?.length == e?.slots?.filter((e) => e.data.id).length && e?.slots?.newData[0]?.id && <Feather name="upload-cloud" size={24} color="#2196f3" />}
                  {e?.slots?.filter((e) => e.newData.id)?.length && e?.slots?.filter((e) => e.data.id).length && <Feather name="upload-cloud" size={24} color="#deb617" />}
                  {!e?.slots?.filter((e) => e.newData.id)?.length && !e?.slots?.filter((e) => e.data.id).length && <Feather name="upload-cloud" size={24} color="#ddd" />}

                  <Text style={{ fontSize: 10 }}>
                    Отпр: {e?.slots?.filter((e) => e.newData.id) || "0"}/
                    {e?.slots?.lenth || "0"}{" "}
                  </Text>
                </View>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  {e?.slots?.filter((e) => e.data.id)?.length && <Feather name="download-cloud" size={24} color="#deb617" />}
                  {!e?.slots?.filter((e) => e.data.id)?.length && <Feather name="download-cloud" size={24} color="#ddd" />}
                  <Text style={{ fontSize: 10 }}>
                    Загр: {e?.slots?.filter((e) => e.data.id) || "0"}/
                    {e?.slots?.lenth || "0"}{" "}
                  </Text>
                </View>
              </View>
              {press && (
                <View style={{ flexBasis: 25 }}>
                  {checkedElements.includes(e.flight.data.id) && (
                    <FontAwesome name="check-circle" size={24} color="#2196f3" />
                  )}
                  {!checkedElements.includes(e.flight.data.id) && (
                    <FontAwesome name="circle-o" size={24} color="#ddd" />
                  )}
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
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
