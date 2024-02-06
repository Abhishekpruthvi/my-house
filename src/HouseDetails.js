import React from 'react';
import { Grid, Paper, Typography, Button, Divider } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';


export default function HouseDetails() {
    const location = useLocation();
    const { data } = location.state;
    const { index } = useParams();

    const record = data[index];

    const navigate = useNavigate();

    const handleUpdateDetails = (index) => {
        // Replace '/your-link' with the actual link you want to navigate to
        console.log("selected record================== ",record)
        navigate(`/update/${index}`,  { state: { updateData: record } });
      };


    return (
        <Grid container>
            <Grid container justifyContent="center" alignContent="center" spacing={2} marginTop="10px">
                <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '99%', textAlign: 'center' }}>
                    <Typography variant="h4">
                        House Details
                    </Typography>

                    <Paper style={{ width: '95%', padding: '20px', marginTop: "-5px", textAlign: 'center' }}>


                        <Typography variant="h8">

                            <br />
                                    House No : {record[1]}
                            <br />
                                    RR No : {record[2]}
                            <br />
                                    Date of Occupancy : {record[3]}
                            <br />

                                    Name : {record[4]}
                            <br />

                                    Phone Number : {record[5]}
                            <br />
                            <Divider />
                        </Typography>

                        <Typography variant="h5" marginTop="25px">
                            Monthly Water Reading
                    </Typography>

                        <Typography variant="h8">

                            January: {record[6]}
                            <br />
                        Febraury: {record[8]}
                            <br />
                        March: {record[10]}
                            <br />
                        April: {record[12]}
                            <br />
                        May: {record[14]}
                            <br />
                        June: {record[16]}
                            <br />
                        July: {record[18]}
                            <br />
                        August: {record[20]}
                            <br />
                        September: {record[22]}
                            <br />
                        October: {record[24]}
                            <br />
                        November: {record[26]}
                            <br />
                        December: {record[28]}
                            <br />
                        </Typography>
                        <Button variant="contained" size="small" onClick={()=>handleUpdateDetails(index)} >
                            Update Water Reading
                        </Button>
                    </Paper>
                </Paper>


                <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '99%', textAlign: 'center' }}>

                    <Paper style={{ width: '95%', padding: '20px', marginTop: "-5px", textAlign: 'center' }}>

                        <Typography variant="h5" marginTop="25px">
                            Monthly Rent Details
                    </Typography>

                        <Typography variant="h8">

                            January: {record[7]}
                            <br />
                        Febraury: {record[9]}
                            <br />
                        March: {record[11]}
                            <br />
                        April: {record[13]}
                            <br />
                        May: {record[15]}
                            <br />
                        June: {record[17]}
                            <br />
                        July: {record[19]}
                            <br />
                        August: {record[21]}
                            <br />
                        September: {record[23]}
                            <br />
                        October: {record[25]}
                            <br />
                        November: {record[27]}
                            <br />
                        December: {record[29]}
                            <br />
                        </Typography>
                        <Button variant="contained" size="small"  >
                            Update Rent Details
                        </Button>
                    </Paper>
                </Paper>
            </Grid>
        </Grid>
    )
}