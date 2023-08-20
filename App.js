import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";

import Login from "./components/Login";
import Tabs from "./navigations/Tabs";
import logginStore from "./stores/logginStore";

export default function App() {
  const { user, getStorage } = logginStore();
  useEffect(() => {
    getStorage();
  }, []);

  return (
    <>
      {user?.id ? (
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      ) : (
        <Login />
      )}
    </>
  );
}
