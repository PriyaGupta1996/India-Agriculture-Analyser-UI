import React, { useState, useEffect } from 'react'
import { DropDown } from '../components/DropDown/DropDown'
import { DataTable } from '../components/Table/DataTable'
import { BarChart } from '../components/BarChart/BarChart'
import { fetchStates } from '../services/stateAPI'
import { fetchDataTable } from '../services/agricultureAPI'
import { dataFlattener } from "../utils/dataFormatter"

export const DashboardsContainer = () => {

    const [states, setStates] = useState([])
    const [tableData, setTableData] = useState([])
    const [selectedState, setSelectedState] = useState("delhi")


    useEffect(() => {
        const executeFetchStates = async () => {
            const result = await fetchStates();
            const formattedData = dataFlattener(result, "StateName")
            setStates(formattedData)
        }
        executeFetchStates()
    }, [])

    useEffect(() => {
        const queryParams = {
            StateName: selectedState
        }
        const executeFetchDataTable = async () => {
            const result = await fetchDataTable(queryParams)
            setTableData(result)
        }
        executeFetchDataTable()
    }, [selectedState])

    return (
        <>
            {
                console.log("Hello Container")
            }
            < DropDown data={states} selectedState={selectedState} setSelectedState={setSelectedState} />
            {/* <BarChart />
            <BarChart /> */}
            < DataTable rows={tableData} setRows={setTableData} stateName={selectedState} />

        </>
    )
}