import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'Year', headerName: 'Year', width: 70 },
    { field: 'District', headerName: 'District', width: 130 },
    { field: 'Season', headerName: 'Season', width: 130 },
    { field: 'Crop', headerName: 'Crop', width: 130 },
    { field: 'Area', headerName: 'Area', width: 130 },
    { field: 'Production', headerName: 'Production', width: 130 },
    { field: 'Yield', headerName: 'Yield', width: 130 },
    { field: 'id', headerName: 'Yield', width: 130 },
];



export function DataTable({ rows }) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}

            />
        </div>
    );
}