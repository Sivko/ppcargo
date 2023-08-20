import { Button, Text, View } from "react-native";

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ textAlign: "center", marginBottom: 30 }}>
        Внимание! Все несинхронизированные данные будут потеряны, загрузить
        рейсы для сканировая?
      </Text>
      <Button onPress={() => navigation.goBack()} title="Да, продолжить" />
    </View>
  );
}

export default ModalScreen;
