import { MantineProvider, Table } from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";
import dbData from "./db.json";
import { tabel2Data, table1Data } from "./utils/utils";

function App() {
  const table1rows = table1Data(dbData).map((each, index) => (
    <Table.Tr key={`${each.year}-${index}`}>
      <Table.Td>{each.year}</Table.Td>
      <Table.Td>{each.maxCrops}</Table.Td>
      <Table.Td>{each.minCrops}</Table.Td>
    </Table.Tr>
  ));

  const table2rows = tabel2Data(dbData).map((each, index) => (
    <Table.Tr key={`${each.crop}-${index}`}>
      <Table.Td>{each.crop}</Table.Td>
      <Table.Td>{each.cropYield}</Table.Td>
      <Table.Td>{each.cropArea}</Table.Td>
    </Table.Tr>
  ));

  console.log(tabel2Data(dbData));

  return (
    <div className="App">
      <div className="table-1">
        <MantineProvider>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Year</Table.Th>
                <Table.Th>Crop with Maximum Production in that Year</Table.Th>
                <Table.Th>Crop with Minimum Production in that Year</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{table1rows}</Table.Tbody>
          </Table>
        </MantineProvider>
      </div>

      <div className="table-2">
        <MantineProvider>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Crop</Table.Th>
                <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
                <Table.Th>Average Cultivation Area of the Crop betwe</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{table2rows}</Table.Tbody>
          </Table>
        </MantineProvider>
      </div>
    </div>
  );
}

export default App;
