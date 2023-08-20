import AsyncStorage from "@react-native-async-storage/async-storage";
import * as zustand from "zustand";

const scanStore = zustand.create((set) => ({
  scanItems: [],
  getStoragescanItems: async () => {
    const storage = await AsyncStorage.getItem("scanItems");
    if (storage === null) return;
    const data = JSON.parse(storage);
    return set({ scanItems: data });
  },
  setStoragescanItems: async ({ invoice, slots }) => {
    const data = { invoice, slots };
    return set((state) => {
      AsyncStorage.setItem(
        "scanItems",
        JSON.stringify([data, ...state.scanItems]),
      );
      return {
        scanItems: [data, ...state.scanItems],
      };
    });
  },
  resetStoragescanItems: async (data) => {
    return set((state) => {
      AsyncStorage.setItem("scanItems", JSON.stringify(data));
      return {
        scanItems: data,
      };
    });
  },
  removeStoragescanItems: async () => {
    await AsyncStorage.setItem("scanItems", "");
    return set((state) => ({ scanItems: [] }));
  },
}));

export default scanStore;
