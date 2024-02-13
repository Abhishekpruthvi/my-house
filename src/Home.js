import React, { useState, useEffect } from 'react';
import './Building.css';
import { Link } from 'react-router-dom';
import {
    Grid, Paper, Typography, Button, Box, Divider, TextField, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, MenuItem
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import GoogleSheetApi from './GoogleSheetApi';
import HouseDetails from './HouseDetails';
import { useNavigate } from 'react-router-dom';
import FirebaseDatastore from './FirebaseDatastore';

export default function Home() {

    const [groundFloor, setGroundFloor] = useState(true);
    const [firstFloor, setFirstFloor] = useState(true);
    const [secondFloor, setSecondFloor] = useState(true);
    const [thirdFloor, setThirdFloor] = useState(true);
    const [data, setData] = useState(null);
    const [rentalType, setRentalType] = useState('');
    const [addHouse, setAddHouse] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [houseDetails, setHouseDetails] = useState({ waterReading: [{ month: {}, year: new Date().getFullYear() }], rentDetails: [{ month: {}, year: new Date().getFullYear() }] })
    const [type, setType] = useState('');
    const [refresh, setRefresh] = useState(false);

    const floors = ["Ground Floor", "First Floor", "Second Floor", "Third Floor"]
    const houseNumbers = ["House 1", "House 2", "House 3", "House 4"]
    const shopNumbers = ["Shop 1", "Shop 2", "Shop 3", "Shop 4", "Shop 5"]
    const types = ["House", "Shop"]

    const navigate = useNavigate();

    const handleClose = () => {
        setDialogOpen(false);
    }

    const handleOpen = () => {
        setDialogOpen(true);
    }

    const handleFloorChange = (e) => {
        let updatedHouse = houseDetails;
        updatedHouse.floor = e.target.value;
        setHouseDetails(updatedHouse);
    }

    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    const handleHouseChange = (e) => {
        let updatedHouse = houseDetails;
        updatedHouse.houseNumber = e.target.value;
        setHouseDetails(updatedHouse);
    }

    const handleRrNumberChange = (e) => {
        let updatedHouse = houseDetails;
        updatedHouse.rrNumber = e.target.value;
        setHouseDetails(updatedHouse);
    }

    const handleDateOfOccupancy = (e) => {
        let updatedHouse = houseDetails;
        updatedHouse.dateOfOccupancy = new Date(e.target.value);
        setHouseDetails(updatedHouse);
    }

    const handleNameChange = (e) => {
        let updatedHouse = houseDetails;
        updatedHouse.name = e.target.value;
        setHouseDetails(updatedHouse);
    }

    const handleMobileNumberChange = (e) => {
        let updatedHouse = houseDetails;
        updatedHouse.mobileNumber = e.target.value;
        setHouseDetails(updatedHouse);
    }


    const updateHouse = () => {
        console.log("house details======================= {} ", houseDetails)
        FirebaseDatastore.addData(houseDetails).catch(error => {
            console.error("Error Occured")
        });
        setDialogOpen(false);
        setRefresh(true);
        setHouseDetails({ waterReading: [{ month: {}, year: new Date().getFullYear() }], rentDetails: [{ month: {}, year: new Date().getFullYear() }] });
    }

    const handleGroundFloor = () => {
        setGroundFloor(!groundFloor)
    }

    const handleFirstFloor = () => {
        setFirstFloor(!firstFloor)
    }

    const handleSecondFloor = () => {
        setSecondFloor(!secondFloor)
    }
    const handleThirdFloor = () => {
        setThirdFloor(!thirdFloor)
    }

    const getDate = (seconds, nanoSeconds) => {
        const date = new Date(seconds * 1000 + nanoSeconds / 1000000);
        return date.toLocaleDateString();
    }
    useEffect(() => {

        FirebaseDatastore.fetchData().then((response) => {
            console.log("In home ============", response);
            response.sort((a, b) => a.houseNumber.localeCompare(b.houseNumber));
            setData(response)
        }).catch(error => {
            console.error("Error Occured")
        });
        setRefresh(false);
    }, [refresh, houseDetails])

    const handleViewMoreClick = (index) => {
        // Replace '/your-link' with the actual link you want to navigate to
        navigate(`/my-house/update/${index}`, { state: { data: data, updateData: data[index] } });
    };

    const handleViewMore = (record) => {
        // Replace '/your-link' with the actual link you want to navigate to
        navigate(`/my-house/update/${record.floor}/${record.houseNumber}`, { state: { data: record } });
    };

    return (
        <Grid container>
            <Grid container justifyContent="center" alignContent="center" spacing={2} marginTop="10px">
                <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '99%', textAlign: 'center' }}>
                    <Typography variant="h5" margin="10px">
                        House Details
                    </Typography>
                    <Button variant="contained" size="large" style={{ width: "95%", margin: "5px" }}
                        onClick={handleGroundFloor}
                    >
                        <Typography variant="h8" >
                            Ground Floor {groundFloor ? <ArrowDropUpIcon /> : <ArrowDropDownIcon style={{ verticalAlign: 'middle' }} />}
                        </Typography>
                    </Button>

                    {groundFloor ?

                        <Paper style={{ width: '95%', padding: '20px', marginTop: "-5px", textAlign: 'center' }}>
                            {data &&  data.map((record, index) => {

                                if (record.floor === "Ground Floor") {
                                    return (
                                        <Typography key={index} variant="h8">
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    {record.houseNumber.includes("House") ?
                                                        <div>House No </div> : <div>Shop No </div>}
                                                    <div>RR No </div>
                                                    <div>Date of Occupancy </div>
                                                    <div>Name </div>
                                                    <div>Mobile Number </div>
                                                </div>
                                                <div>
                                                    <div>:</div>
                                                    <div> :</div>
                                                    <div>:</div>
                                                    <div> :</div>
                                                    <div> :</div>
                                                </div>
                                                <div>
                                                    <div>{record.houseNumber}</div>
                                                    <div>{record.rrNumber}</div>
                                                    <div>{getDate(record.dateOfOccupancy.seconds, record.dateOfOccupancy.nanoseconds)}</div>
                                                    <div>{record.name}</div>
                                                    <div>{record.mobileNumber}</div>
                                                </div>
                                            </div>
                                            <br />
                                            <Button variant="contained" size="small" onClick={() => handleViewMore(record)} >
                                                View More
                                    </Button>
                                            <Divider style={{ margin: "20px" }} />
                                        </Typography>
                                    )
                                }
                            })}
                        </Paper>
                        : null
                    }

                    <Button variant="contained" size="large" style={{ width: "95%", margin: "5px" }}
                        onClick={handleFirstFloor}
                    >
                        <Typography variant="h8" >
                            First Floor {firstFloor ? <ArrowDropUpIcon /> : <ArrowDropDownIcon style={{ verticalAlign: 'middle' }} />}
                        </Typography>
                    </Button>

                    {firstFloor ?

                        <Paper style={{ width: '95%', padding: '20px', marginTop: "-5px", textAlign: 'center' }}>
                            {data && data.map((record, index) => {

                                if (record.floor === "First Floor") {
                                    return (
                                        <Typography key={index} variant="h8">
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    {record.houseNumber.includes("House") ?
                                                        <div>House No </div> : <div>Shop No </div>}
                                                    <div>RR No </div>
                                                    <div>Date of Occupancy </div>
                                                    <div>Name </div>
                                                    <div>Mobile Number </div>
                                                </div>
                                                <div>
                                                    <div>:</div>
                                                    <div> :</div>
                                                    <div>:</div>
                                                    <div> :</div>
                                                    <div> :</div>
                                                </div>
                                                <div>
                                                    <div>{record.houseNumber}</div>
                                                    <div>{record.rrNumber}</div>
                                                    <div>{getDate(record.dateOfOccupancy.seconds, record.dateOfOccupancy.nanoseconds)}</div>
                                                    <div>{record.name}</div>
                                                    <div>{record.mobileNumber}</div>
                                                </div>
                                            </div>
                                            <br />
                                            <Button variant="contained" size="small" onClick={() => handleViewMore(record)} >
                                                View More
        </Button>
                                            <Divider style={{ margin: "20px" }} />
                                        </Typography>
                                    )
                                }
                            })}
                        </Paper>
                        : null
                    }

                    <Button variant="contained" size="large" style={{ width: "95%", margin: "5px" }}
                        onClick={handleSecondFloor}
                    >
                        <Typography variant="h8" >
                            Second Floor {secondFloor ? <ArrowDropUpIcon /> : <ArrowDropDownIcon style={{ verticalAlign: 'middle' }} />}
                        </Typography>
                    </Button>

                    {secondFloor ?

                        <Paper style={{ width: '95%', padding: '20px', marginTop: "-5px", textAlign: 'center' }}>
                            {data && data.map((record, index) => {

                                if (record.floor === "Second Floor") {
                                    return (
                                        <Typography key={index} variant="h8">
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    {record.houseNumber.includes("House") ?
                                                        <div>House No </div> : <div>Shop No </div>}
                                                    <div>RR No </div>
                                                    <div>Date of Occupancy </div>
                                                    <div>Name </div>
                                                    <div>Mobile Number </div>
                                                </div>
                                                <div>
                                                    <div>:</div>
                                                    <div> :</div>
                                                    <div>:</div>
                                                    <div> :</div>
                                                    <div> :</div>
                                                </div>
                                                <div>
                                                    <div>{record.houseNumber}</div>
                                                    <div>{record.rrNumber}</div>
                                                    <div>{getDate(record.dateOfOccupancy.seconds, record.dateOfOccupancy.nanoseconds)}</div>
                                                    <div>{record.name}</div>
                                                    <div>{record.mobileNumber}</div>
                                                </div>
                                            </div>
                                            <br />
                                            <Button variant="contained" size="small" onClick={() => handleViewMore(record)} >
                                                View More
        </Button>
                                            <Divider style={{ margin: "20px" }} />
                                        </Typography>
                                    )
                                }
                            })}
                        </Paper>
                        : null
                    }


                    <Button variant="contained" size="large" style={{ width: "95%", margin: "5px" }}
                        onClick={handleThirdFloor}
                    >
                        <Typography variant="h8" >
                            Third Floor {thirdFloor ? <ArrowDropUpIcon /> : <ArrowDropDownIcon style={{ verticalAlign: 'middle' }} />}
                        </Typography>
                    </Button>

                    {thirdFloor ?

                        <Paper style={{ width: '95%', padding: '20px', marginTop: "-5px", textAlign: 'center' }}>
                            { data && data && data.map((record, index) => {

                                if (record.floor === "Third Floor") {
                                    return (
                                        <Typography key={index} variant="h8">
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>
                                                    {record.houseNumber.includes("House") ?
                                                        <div>House No </div> : <div>Shop No </div>}
                                                    <div>RR No </div>
                                                    <div>Date of Occupancy </div>
                                                    <div>Name </div>
                                                    <div>Mobile Number </div>
                                                </div>
                                                <div>
                                                    <div>:</div>
                                                    <div> :</div>
                                                    <div>:</div>
                                                    <div> :</div>
                                                    <div> :</div>
                                                </div>
                                                <div>
                                                    <div>{record.houseNumber}</div>
                                                    <div>{record.rrNumber}</div>
                                                    <div>{getDate(record.dateOfOccupancy.seconds, record.dateOfOccupancy.nanoseconds)}</div>
                                                    <div>{record.name}</div>
                                                    <div>{record.mobileNumber}</div>
                                                </div>
                                            </div>
                                            <br />
                                            <Button variant="contained" size="small" onClick={() => handleViewMore(record)} >
                                                View More
        </Button>
                                            <Divider style={{ margin: "20px" }} />
                                        </Typography>
                                    )
                                }
                            })}
                        </Paper>
                        : null
                    }

                    <Grid item margin="20px">
                        <Button variant="contained" size="small" color="error" onClick={handleOpen} >
                            Add House
                                    </Button>
                    </Grid>

                </Paper>


                <Dialog open={dialogOpen} onClose={handleClose}>
                    <DialogTitle>Add Rent</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Enter the Month and Rent</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="floor"
                            name="floor"
                            label="floor"
                            select
                            fullWidth
                            value={houseDetails.floor}
                            onChange={handleFloorChange}
                        >
                            {floors.map((floor, index) => (
                                <MenuItem key={index} value={floor}>
                                    {floor}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            margin="dense"
                            id="type"
                            name="type"
                            label="Type"
                            select
                            fullWidth
                            value={type}
                            onChange={handleTypeChange}
                        >
                            {types.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                        {type === "House" ?
                            <TextField
                                margin="dense"
                                id="rent"
                                name="housenumber"
                                label="House Number"
                                select
                                fullWidth
                                value={houseDetails.houseNumber}
                                onChange={handleHouseChange}
                            >
                                {houseNumbers.map((house, index) => (
                                    <MenuItem key={index} value={house}>
                                        {house}
                                    </MenuItem>
                                ))}
                            </TextField>
                            :
                            <TextField
                                margin="dense"
                                id="rent"
                                name="housenumber"
                                label="House Number"
                                select
                                fullWidth
                                value={houseDetails.houseNumber}
                                onChange={handleHouseChange}
                            >
                                {shopNumbers.map((shop, index) => (
                                    <MenuItem key={index} value={shop}>
                                        {shop}
                                    </MenuItem>
                                ))}
                            </TextField>
                        }

                        <TextField
                            margin="dense"
                            id="rrnumber"
                            name="rrnumber"
                            label="RR Number"
                            type="text"
                            fullWidth
                            value={houseDetails.rrNumber}
                            onChange={handleRrNumberChange}
                        />

                        <TextField
                            margin="dense"
                            id="doc"
                            name="dateofoccupancy"
                            label="Date of Occupancy"
                            type="date"
                            fullWidth
                            value={houseDetails.dateOfOccupancy}
                            onChange={handleDateOfOccupancy}
                            InputLabelProps={{
                                shrink: true,
                            }}

                        />

                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={houseDetails.name}
                            onChange={handleNameChange}
                        />
                        <TextField
                            margin="dense"
                            id="mobilenumber"
                            name="mobilenumber"
                            label="Mobile Number"
                            type="number"
                            fullWidth
                            value={houseDetails.mobileNumber}
                            onChange={handleMobileNumberChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={updateHouse}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </Grid>
    )
}
