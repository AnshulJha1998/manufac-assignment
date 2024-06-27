export type MANUFAC_DATA_TYPE = {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
};

export type TRANSFORMED_MANUFAC_DATA_TYPE = {
  country: string;
  year: string;
  cropName: string;
  cropProd: string;
  cropYield: string;
  area: string;
};

export type TABLE_1_DATA = {
  year: string;
  maxCrops: string;
  minCrops: string;
};

export type TABLE_2_DATA = {
  crop: string;
  cropYield: string;
  cropArea: string;
};
