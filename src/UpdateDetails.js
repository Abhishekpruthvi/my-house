import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoogleSheetApi from './GoogleSheetApi';


export default function UpdateDetails() {

    const location = useLocation();
    const { updateData } = location.state;
    const { index } = useParams();
    const navigate = useNavigate();

    const months = ["Janaury", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const monthsWaterIndex = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28]
    // const updates = [
    // { range: 'Sheet1!A1:C3', values: [['New Value 1', 'New Value 2', 'New Value 3']] },
    // { range: 'Sheet1!D5:E5', values: [['Another Value 1', 'Another Value 2']] },
    // Add more updates as needed
    const [editableData, setEditableData] = useState(updateData);
    const [updatedData, setUpdatedData] = useState([]);

    const handleEdit = (columnIndex, value) => {
        let sheetIndex = String.fromCharCode(65 + columnIndex);
        let rowIndex = parseInt(index) + 1;
        console.log("swheet index ", sheetIndex)
        console.log("Now ======== ", `Sheet1!${sheetIndex}${rowIndex}`)
        let rangeData = {
            range: `Sheet1!${sheetIndex}${rowIndex}`,
            values: [[value]]
        }
        let data = updatedData;
        let dataAlreadyAdded = false;
        data.map((range) => {
            if (range.range === rangeData.range) {
                range.values = rangeData.values;
                dataAlreadyAdded = true;
                return range;
            }
        })
        if (dataAlreadyAdded === false)
            data.push(rangeData);
        setUpdatedData(data);
        console.log("data =========", data)
    };


    const handleSubmit = () => {
        // Replace '/your-link' with the actual link you want to navigate to
        console.log("selected record================== ", updatedData)
        GoogleSheetApi.updateNonContinuousRanges(updatedData).then((response) => {
            console.log('update response ===========', response)

        }).catch(error => {
            console.error("Error Occured")
        });
        //  navigate('/');

    };


    return (
        <Grid container marginTop="10px" spacing={1} justifyContent="center">

            <Typography variant="h5">
                Floor : {updateData[0]} | House : {updateData[1]}
            </Typography>
            <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black' }}>Months</th>
                        <th style={{ border: '1px solid black' }}>Water Reading</th>
                        <th style={{ border: '1px solid black' }}>Rent</th>
                    </tr>
                </thead>
                <tbody>
                    {months.map((month, index) => (
                        console.log("month index =======", index),
                        <tr key={index}>
                            <th style={{ fontSize: "14px", border: '1px solid black' }}>
                                {month}
                            </th>
                            <td style={{ border: '1px solid black' }}>
                                <input
                                    type="text"
                                    value={editableData[monthsWaterIndex[index]]}
                                    onChange={(e) => handleEdit(monthsWaterIndex[index], e.target.value)}
                                    style={{ width: "140px", height: "40px" }}
                                />
                            </td>
                            <td style={{ border: '1px solid black' }}>
                                <input
                                    type="text"
                                    value={editableData[monthsWaterIndex[index] + 1]}
                                    onChange={(e) => handleEdit(monthsWaterIndex[index] + 1, e.target.value)}
                                    style={{ width: "140px", height: "40px" }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <Grid item justifyContent="center" justifyItems="center" justifySelf="center" alignContent="center">
                <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
                    Submit
            </Button>
            </Grid> */}

        </Grid>
    );
}