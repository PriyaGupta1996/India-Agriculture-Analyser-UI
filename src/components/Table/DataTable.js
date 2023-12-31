import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
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

export const DataTable = ({ rows, setFilters, filters }) => {
    const handleSortModelChange = async (sortModel) => {
        const currentFilter = { ...filters }
        currentFilter["sortColumn"] = sortModel[0]?.field.toLowerCase()
        currentFilter["sortOrder"] = sortModel[0]?.sort
        setFilters(currentFilter)
    };

    return (
        <div style={{ height: 400, width: '60%' }}>
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