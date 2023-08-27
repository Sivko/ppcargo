// import scanStore from "@/stores/scanStore";

import axios from "axios";
import config, { stagesCategories, timeout } from "../config";

// const { idFlightsToDownloads } = scanStore();
export default async function downloadSlotInFlights({ idFlightsToDownloads, resetStoragescanItems, scanItems, setLoading }) {
  console.log(scanItems, "scanItems");
  setLoading(true);
  for (let i in idFlightsToDownloads) {
    const url = `https://app.salesap.ru/api/v1/deals/${idFlightsToDownloads[i]}?include=deals`;
    const res = await axios.get(url, config);
    if (res.data?.included?.length) {
      let tmp = scanItems.filter((e) => e.flight.data.id === idFlightsToDownloads[i])[0];
      // tmp.slots = res.data?.included.map(e => ({ data: { id: e.id, type: e.type, attributes: e.attributes } }));
      // console.log(([tmp, ...scanItems.filter((e) => e.flight.data.id !== idFlightsToDownloads[i])]), "TMP");
      // resetStoragescanItems([tmp, ...scanItems.filter((e) => e.flight.data.id !== idFlightsToDownloads[i])]);
      let includeDeals = res.data?.included.map(e => e.id)
      for (let m in includeDeals) {
        const includeDealStage = await axios.get(`https://app.salesap.ru/api/v1/deals/${includeDeals[m]}/relationships/stage-category`).catch(e=>console.log(e.message))
        if (includeDealStage.data.id === stagesCategories.transport) {
          console.log(`https://app.salesap.ru/api/v1/deals/${includeDeals[m]}`, "AAAA")
          const includeDeal = await axios.get(`https://app.salesap.ru/api/v1/deals/${includeDeals[m]}`).catch(e=>console.log(e.message));
          tmp.slots = [includeDeal.data, ...tmp.slots];
          resetStoragescanItems([tmp, ...scanItems.filter((e) => e.flight.data.id !== idFlightsToDownloads[i])]);
        }
        await new Promise(r => setTimeout(r, timeout));
      }
    }
  }
  setLoading(false);
}
