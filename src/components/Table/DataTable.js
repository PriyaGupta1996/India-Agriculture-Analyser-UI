import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { columns } from './columns';
export const DataTable = ({ rows, setFilters, filters, rowCount }) => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });


    const handleSortModelChange = async (sortModel) => {
        const currentFilter = { ...filters }
        currentFilter["sortColumn"] = sortModel[0]?.field.toLowerCase()
        currentFilter["sortOrder"] = sortModel[0]?.sort
        setFilters(currentFilter)
    };

    const handlePaginationModelChange = async (currentPaginationModel) => {
        const { page, pageSize } = currentPaginationModel
        const currentFilters = { ...filters }
        currentFilters.page = page + 1
        currentFilters.pageSize = pageSize
        setFilters(currentFilters)
        setPaginationModel(currentPaginationModel)
    }

    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={{
                    boxShadow: 2,
                    border: 3,
                    borderColor: '#c8e6c9',
                    '& .MuiDataGrid-cell:hover': {
                        color: "#1b5e20",
                    },
                    '& .super-app-theme--header': {
                        backgroundColor: "#c8e6c9",
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 600,
                    }
                }}
                sortingMode="server"
                onSortModelChange={handleSortModelChange}
                slots={{ toolbar: GridToolbar }}
                pageSizeOptions={[10, 30, 50, 100]}
                slotProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
                disableColumnMenu
                disableColumnFilter
                rowCount={rowCount}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={handlePaginationModelChange}
            />
        </div>
    );
}