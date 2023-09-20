// import scanStore from "@/stores/scanStore";

import axios from "axios";
import config, { stagesCategories, timeout } from "@/requests/config";

// const { idFlightsToDownloads } = scanStore();
export default async function downloadSlotInFlights({ idFlightsToDownloads, resetStoragescanItems, scanItems, setLoading }) {
  console.log(scanItems, "scanItems");
  setLoading(true);
  for (let i in idFlightsToDownloads) {
    const url = `https://app.salesap.ru/api/v1/deals/${idFlightsToDownloads[i]}?include=deals`;
    const res = await axios.get(url, config);
    if (res.data?.included?.length) {
      console.log("Сработала проверочка")
      let tmp = scanItems.filter((e) => e.flight.data.id === idFlightsToDownloads[i])[0];
      tmp.slots = [];
      // tmp.slots = res.data?.included.map(e => ({ data: { id: e.id, type: e.type, attributes: e.attributes } }));
      // console.log(([tmp, ...scanItems.filter((e) => e.flight.data.id !== idFlightsToDownloads[i])]), "TMP");
      // resetStoragescanItems([tmp, ...scanItems.filter((e) => e.flight.data.id !== idFlightsToDownloads[i])]);
      const childrenDeals = res.data?.included.map(e => e.id)
      for (let n in childrenDeals) {
        const getChildrenStage = await axios.get(`https://app.salesap.ru/api/v1/deals/${childrenDeals[n]}/relationships/stage-category`, config).catch(e => console.log(e.message));
        // debugger
        if (getChildrenStage.data.data.id === stagesCategories.invoice) {
          console.log("Сработала проверочка 2")
          const getIncludesInInvoice = await axios.get(`https://app.salesap.ru/api/v1/deals/${childrenDeals[n]}?include=deals`, config);
          const getIncludesInInvoiceId = getIncludesInInvoice.data?.included.map(e => e.id);
          for (let x in getIncludesInInvoiceId) {
            const getStageIncludesInInvoice = await axios.get(`https://app.salesap.ru/api/v1/deals/${getIncludesInInvoiceId[x]}/relationships/stage-category`, config).catch(e => console.log(e.message));
            if (getStageIncludesInInvoice.data.data.id === stagesCategories.slot) {
              console.log("Сработала проверочка 3")
              const slotData = await axios.get(`https://app.salesap.ru/api/v1/deals/${getIncludesInInvoiceId[x]}`, config).catch(e => console.log(e.message));
              const _slotData = slotData.data.data;
              tmp.slots = [...tmp.slots, { data: { id: _slotData.id, type: 'deals', attributes: _slotData.attributes } }];
              resetStoragescanItems([tmp, ...scanItems.filter((e) => e.flight.data.id !== idFlightsToDownloads[i])]);
            }
          }
        }
      }
      //   for (let m in includeDeals) {
      //     const includeDealStage = await axios.get(`https://app.salesap.ru/api/v1/deals/${includeDeals[m]}/relationships/stage-category`, config).catch(e=>console.log(e.message))
      //     debugger
      //     if (includeDealStage.data.data.id === stagesCategories.slot) {
      //       console.log(`https://app.salesap.ru/api/v1/deals/${includeDeals[m]}`, "AAAA")
      //       const includeDeal = await axios.get(`https://app.salesap.ru/api/v1/deals/${includeDeals[m]}`, config).catch(e=>console.log(e.message));
      //       tmp.slots = [includeDeal.data, ...tmp.slots];
      //       resetStoragescanItems([tmp, ...scanItems.filter((e) => e.flight.data.id !== idFlightsToDownloads[i])]);
      //     }
      //     await new Promise(r => setTimeout(r, timeout));
      //   }
    }
  }
  setLoading(false);
}
