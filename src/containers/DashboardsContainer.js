import React, { useState, useEffect } from 'react'
import { DropDown } from '../components/DropDown/DropDown'
import { DataTable } from '../components/Table/DataTable'
import { BarChart } from '../components/BarChart/BarChart'
import { fetchStates } from '../services/stateAPI'
import { fetchDataTable } from '../services/agricultureAPI'
import { dataFlattener } from "../utils/dataFormatter"
import { fetchProductionPerCrop, fetchProductionPerYear } from '../services/chartAPI'

export const DashboardsContainer = () => {

    const [states, setStates] = useState([])
    const [tableData, setTableData] = useState([])
    const [productionPerYear, setProductionPerYear] = useState({})
    const [productionPerCrop, setProductionPerCrop] = useState({})
    const [filters, setFilters] = useState({ StateName: "delhi" })

    useEffect(() => {
        const executeFetchStates = async () => {
            const result = await fetchStates();
            const formattedData = dataFlattener(result, "StateName")
            setStates(formattedData)
        }
        executeFetchStates()
    }, [])

    useEffect(() => {
        const executeFetchDataInParallel = async () => {
            // Run all three asynchronous functions in parallel
            const [dataTableResult, yearlyProduction, cropWiseProduction] = await Promise.all([
                fetchDataTable(filters),
                fetchProductionPerYear(filters.StateName),
                fetchProductionPerCrop(filters.StateName),
            ]);

            // Update state with the results
            setTableData(dataTableResult);
            setProductionPerYear(yearlyProduction);
            setProductionPerCrop(cropWiseProduction);
        };

        executeFetchDataInParallel()
    }, [filters])


    // useEffect(() => {
    //     console.log("inside use effect filter is ", filters)
    //     const executeFetchDataInParallel = async () => {
    //         // Run all three asynchronous functions in parallel
    //         const dataTableResult = await fetchDataTable(filters)
    //         // Update state with the results
    //         setTableData(dataTableResult);
    //     };

    //     executeFetchDataInParallel()
    // }, [filters])

    return (
        <>
            < DropDown data={states} filters={filters} setFilters={setFilters} />
            {productionPerCrop && productionPerCrop.length > 0 &&
                <BarChart
                    chartData={productionPerCrop}
                    filters={filters}
                    setFilters={setFilters}
                    xaxis={"Crop"}
                    yaxis={"TotalProduction"}
                    chartTitle={"Production per Crop"}
                    chartColor="#fdd835" />
            }
            {productionPerYear && productionPerYear.length > 0 &&
                <BarChart
                    chartData={productionPerYear}
                    filters={filters}
                    setFilters={setFilters}
                    xaxis={"Year"}
                    yaxis={"TotalProduction"}
                    chartTitle={"Production per Year"}
                    chartColor="#43a047" />}
            < DataTable rows={tableData} setFilters={setFilters} filters={filters} />

        </>
    )
}