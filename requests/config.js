export const config = {
  headers: {
    "Content-Type": "application/vnd.api+json",
    Authorization: `Bearer mUYmfdF5Hr0zUC9b3WLmR94p_DH4-GPkdQ42FmBZpv0`,
  },
  validateStatus(status) {
    return status < 500; // Resolve only if the status code is less than 500
  },
};

export const timeout = 300;

export const stagesCategories = {
  transport: "51231",
  invoice: "51230",
  slot: "51229",
}

export const fields = {
  idStageSlot: 327682,
  idStageInvoce: 327685,
  length: "custom-114632",
  width: "custom-114633",
  height: "custom-114634",
  weight: "custom-99659",
  transport: "custom-99663",
  barcode: "custom-114979",
  clientCode: "custom-102382",
  numberTTN: "custom-115383",
  scanTSD: "custom-99670",
  token: "custom-111111",
};

export default config;
