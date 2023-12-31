import * as React from 'react';
import { DataGrid, GridToolbar, GridColDef } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { fetchDataTable } from "../../services/agricultureAPI"
import { titleCase, roundDecimals } from '../../utils/dataFormatter';
const columns = [
    { field: 'Year', headerName: 'Year', width: 70 },
    {
        field: 'District',
        valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return titleCase(params.value);
        }, headerName: 'District', width: 130
    },
    {
        field: 'Season', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return titleCase(params.value);
        }, headerName: 'Season', width: 130
    },
    {
        field: 'Crop', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return titleCase(params.value);
        }, headerName: 'Crop', width: 130
    },
    {
        field: 'Area', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return roundDecimals(params.value);
        }, headerName: 'Area', width: 130
    },
    {
        field: 'Production', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return roundDecimals(params.value);
        }, headerName: 'Production', width: 130
    },
    {
        field: 'Yield', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return roundDecimals(params.value);
        }, headerName: 'Yield', width: 130
    },
];

export const DataTable = ({ rows, setRows, stateName }) => {
    console.log("StateName in Data Table", stateName)
    const handleSortModelChange = async (sortModel) => {
        console.log("SortModel", sortModel);
        const queryParams = {
            StateName: stateName,
            sortColumn: sortModel[0]?.field.toLowerCase(),
            sortOrder: sortModel[0]?.sort
        }
        const result = await fetchDataTable(queryParams)
        setRows(result)
    };

    return (
        <div style={{ height: 400, width: '70%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                sx={{
                    boxShadow: 2,
                    border: 3,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    }
                }}
                sortingMode="server"
                onSortModelChange={handleSortModelChange}
                slots={{ toolbar: GridToolbar, loadingOverlay: LinearProgress }}
                pageSizeOptions={[5, 10]}
                slotProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
                disableColumnMenu
                disableColumnFilter

            />
        </div>
    );
}