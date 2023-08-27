import axios from "axios";

import config from "@/requests/config";

export default async function downloadFlights() {
  const url =
    "https://app.salesap.ru/api/v1/deals?filter[deal-stage-id]=327688?include=deals"; /* сделки на этапе фрахтования */
  const res = await axios.get(url, config);
  return res;
}
