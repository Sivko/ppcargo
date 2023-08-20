import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";

import { removeFlightDeals } from "@/requests/local/getSetFlights";
import { getLogsData, removeLogsData } from "@/requests/local/getSetLogs";
import invocesToUploadStore from "@/stores/invocesToUploadStore";
import logginStore from "@/stores/logginStore";

export function Option() {
  const { setLoading } = invocesToUploadStore();
  const { unloggin } = logginStore();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetching() {
      const res = await getLogsData();
      setLogs(res);
    }
    fetching();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Button
            title="Очистить Рейсы"
            onPress={() => {
              removeFlightDeals();
            }}
          />
          <Button
            title="Очистить Логи"
            onPress={() => {
              removeLogsData([]);
              setLogs([]);
            }}
          />
          <Button
            title="Изменить флаг загрузки"
            onPress={() => {
              setLoading(false);
              alert("Все состояния сброшены");
            }}
          />
          <Button title="Выйти" onPress={unloggin} />
          <Text>Логи:</Text>
          <Text>{JSON.stringify(logs)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});

export default Option;
