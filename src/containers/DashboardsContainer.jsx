import React, { useState, useEffect } from "react";
import { DropDown } from "../components/DropDown/DropDown";
import { DataTable } from "../components/Table/DataTable";
import { BarChart } from "../components/BarChart/BarChart";
import { fetchStates } from "../services/stateAPI";
import { fetchDataTable } from "../services/agricultureAPI";
import { dataFlattener } from "../utils/dataFormatter";
import { ErrorComponent } from "../components/ErrorComponent";
import {
  fetchProductionPerCrop,
  fetchProductionPerYear,
} from "../services/chartAPI";

export const DashboardsContainer = () => {
  const [states, setStates] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [productionPerYear, setProductionPerYear] = useState({});
  const [productionPerCrop, setProductionPerCrop] = useState({});
  const [filters, setFilters] = useState({ StateName: "delhi" });
  const [error, setError] = useState("");

  useEffect(() => {
    const executeFetchStates = async () => {
      try {
        const result = await fetchStates();
        const formattedData = dataFlattener(result, "StateName");
        setStates(formattedData);
      } catch (err) {
        setError(err.message);
      }
    };
    executeFetchStates();
  }, []);

  useEffect(() => {
    const executeFetchDataInParallel = async () => {
      // Run all three asynchronous functions in parallel
      try {
        const [dataTableResult, yearlyProduction, cropWiseProduction] =
          await Promise.all([
            fetchDataTable(filters),
            fetchProductionPerYear(filters.StateName),
            fetchProductionPerCrop(filters.StateName),
          ]);

        // Update state with the results
        setTableData(dataTableResult);
        setProductionPerYear(yearlyProduction);
        setProductionPerCrop(cropWiseProduction);
      } catch (error) {
        setError(error.message);
      }
    };

    executeFetchDataInParallel();
  }, [filters]);

  return (
    <>
      {error.length > 0 ? (
        <ErrorComponent type="error" message={error} />
      ) : (
        <>
          {states && states.length > 0 && (
            <DropDown data={states} filters={filters} setFilters={setFilters} />
          )}
          {productionPerCrop && productionPerCrop.length > 0 && (
            <BarChart
              chartData={productionPerCrop}
              filters={filters}
              setFilters={setFilters}
              xaxis={"Crop"}
              yaxis={"TotalProduction"}
              chartTitle={"Production per Crop"}
              chartColor="#fdd835"
            />
          )}
          {productionPerYear && productionPerYear.length > 0 && (
            <BarChart
              chartData={productionPerYear}
              filters={filters}
              setFilters={setFilters}
              xaxis={"Year"}
              yaxis={"TotalProduction"}
              chartTitle={"Production per Year"}
              chartColor="#43a047"
            />
          )}
          {tableData && tableData.length > 0 && (
            <DataTable
              rows={tableData}
              setFilters={setFilters}
              filters={filters}
            />
          )}
        </>
      )}
    </>
  );
};
