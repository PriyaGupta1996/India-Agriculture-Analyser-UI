import React, { useState, useEffect } from 'react'
import { DropDown } from '../components/DropDown'
import { Table } from '../components/Table'
import { BarChart } from '../components/BarChart'
import { fetchStates } from '../services/stateAPI'
import { dataFlattener } from "../utils/dataFormatter"

export const DashboardsContainer = () => {

    const [states, setStates] = useState([])

    useEffect(() => {
        const executeFetchStates = async () => {
            const result = await fetchStates();
            const formattedData = dataFlattener(result, "StateName")
            setStates(formattedData)
        }
        executeFetchStates()
    }, [])

    return (
        <>
            <DropDown data={states} />
            {/* <BarChart />
            <BarChart />
            <Table /> */}

        </>
    )
}