import {
  MANUFAC_DATA_TYPE,
  TABLE_1_DATA,
  TABLE_2_DATA,
  TRANSFORMED_MANUFAC_DATA_TYPE,
} from "../types/types";

const arrToString = (arr: string[]): string => {
  if (arr.length >= 2) {
    return `${arr.slice(0, arr.length - 1)} & ${arr[arr.length - 1]}`;
  }
  return `${arr[0]}`;
};

const checkEmptyValues = (value: string | number): string => {
  if (typeof value === "number") return value.toString();
  if (typeof value === "string" && !value.length) return "0";
  return "0";
};

export const transFormedData = (
  data: MANUFAC_DATA_TYPE[]
): TRANSFORMED_MANUFAC_DATA_TYPE[] | [] => {
  if (!data || !data.length) return [];

  return data.map((each) => {
    return {
      country: each.Country,
      year: each.Year.slice(-4),
      cropName: each["Crop Name"],
      cropProd: checkEmptyValues(each["Crop Production (UOM:t(Tonnes))"]),
      cropYield:
        each["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"].toString(),
      area: each["Area Under Cultivation (UOM:Ha(Hectares))"].toString(),
    };
  });
};

export const table1Data = (data: MANUFAC_DATA_TYPE[]): TABLE_1_DATA[] => {
  //Transform the data
  const easedData = transFormedData(data);

  //Group data by year
  const groupedByYear: { [year: string]: TRANSFORMED_MANUFAC_DATA_TYPE[] } = {};

  easedData.forEach((entry) => {
    if (!groupedByYear[entry.year]) {
      groupedByYear[entry.year] = [];
    }
    groupedByYear[entry.year].push(entry);
  }); // Created a map

  //Prepare the table structure
  const table: TABLE_1_DATA[] = [];

  //Calculate max and min crop for each year
  Object.keys(groupedByYear).forEach((year) => {
    const cropsOfYear = groupedByYear[year];

    //Using reduce to find max and min crop
    const { maxCrops, minCrops } = cropsOfYear.reduce(
      (acc, crop) => {
        const production = parseFloat(crop.cropProd);

        //Finding max crop
        if (production > acc.maxProduction) {
          acc.maxProduction = production;
          acc.maxCrops = [crop.cropName];
        } else if (production === acc.maxProduction) {
          acc.maxCrops.push(crop.cropName);
        }

        //Finding min crop
        if (production < acc.minProduction) {
          acc.minProduction = production;
          acc.minCrops = [crop.cropName];
        } else if (production === acc.minProduction) {
          acc.minCrops.push(crop.cropName);
        }
        return acc;
      },
      {
        maxProduction: -Infinity, //Use infinity to keep track of max and min values
        minProduction: Infinity,
        maxCrops: [] as string[],
        minCrops: [] as string[],
      }
    );

    // Format maxCrop and minCrop using arrToString if more than one crop
    const maxCrop = maxCrops.length === 1 ? maxCrops[0] : arrToString(maxCrops);
    const minCrop = minCrops.length === 1 ? minCrops[0] : arrToString(minCrops);

    table.push({
      year: year,
      maxCrops: maxCrop,
      minCrops: minCrop,
    });
  });

  return table;
};

export const tabel2Data = (data: MANUFAC_DATA_TYPE[]): TABLE_2_DATA[] => {
  //Transform the data
  const easedData = transFormedData(data);

  //Group data by crop
  const groupedByCrop: { [cropName: string]: TRANSFORMED_MANUFAC_DATA_TYPE[] } =
    {};

  easedData.forEach((entry) => {
    if (!groupedByCrop[entry.cropName]) {
      groupedByCrop[entry.cropName] = [];
    }
    groupedByCrop[entry.cropName].push(entry);
  });

  console.log(groupedByCrop);
  //Prepare the table structure
  const table: TABLE_2_DATA[] = [];

  Object.keys(groupedByCrop).forEach((crop) => {
    const cropsOfYear = groupedByCrop[crop];

    //Using reduce to find max and min crop
    const { totalYield, totalArea, count } = cropsOfYear.reduce(
      (acc, curr) => {
        const cropyeild = parseFloat(curr.cropYield);
        const croparea = parseFloat(curr.area);

        if (!isNaN(cropyeild)) {
          acc.totalYield += cropyeild;
          acc.count++;
        }

        if (!isNaN(croparea)) {
          acc.totalArea += croparea;
        }

        return acc;
      },
      {
        totalYield: 0,
        totalArea: 0,
        count: 0,
      }
    );

    const averageYield = totalYield / count;
    const averageArea = totalArea / cropsOfYear.length;

    table.push({
      crop: crop,
      cropYield: averageYield.toString(),
      cropArea: averageArea.toString(),
    });
  });

  return table;
};
