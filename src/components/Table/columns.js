import { titleCase, roundDecimals } from '../../utils/dataFormatter';

export const columns = [
    {
        field: 'Year', headerClassName: 'super-app-theme--header', headerName: 'Year', width: 70
    },
    {
        field: 'District', headerClassName: 'super-app-theme--header',
        valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return titleCase(params.value);
        }, headerName: 'District', width: 130
    },
    {
        field: 'Season', headerClassName: 'super-app-theme--header', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return titleCase(params.value);
        }, headerName: 'Season', width: 130
    },
    {
        field: 'Crop', headerClassName: 'super-app-theme--header', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return titleCase(params.value);
        }, headerName: 'Crop', width: 130
    },
    {
        field: 'Area', headerClassName: 'super-app-theme--header', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return roundDecimals(params.value);
        }, headerName: 'Area (Hectare)', width: 150
    },
    {
        field: 'Production', headerClassName: 'super-app-theme--header', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return roundDecimals(params.value);
        }, headerName: 'Production (Ton.)', width: 180
    },
    {
        field: 'Yield', headerClassName: 'super-app-theme--header', valueGetter: (params) => {
            // Convert to titleCase
            if (params.value)
                return roundDecimals(params.value);
        }, headerName: 'Yield (Ton/Hec)', width: 130
    },
];
