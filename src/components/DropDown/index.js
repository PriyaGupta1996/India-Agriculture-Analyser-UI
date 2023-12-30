import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { v4 as uuidv4 } from 'uuid';

export const DropDown = ({ data, selectedState, setSelectedState }) => {

    const handleStateChange = (event) => {
        setSelectedState(event.target.value)
    }
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl >
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedState}
                    label="State"
                    onChange={handleStateChange}
                >

                    {data.map(state => <MenuItem key={uuidv4()} value={state.toLowerCase()} >{state}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>

        // <p>Hello Priya</p>

    );
}