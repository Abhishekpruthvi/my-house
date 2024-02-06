import React, { useState, useEffect } from 'react';
import './Building.css';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Button, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import GoogleSheetApi from './GoogleSheetApi';
import HouseDetails from './HouseDetails';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [groundFloor, setGroundFloor] = useState(false);
    const [firstFloor, setFirstFloor] = useState(false);
    const [secondFloor, setSecondFloor] = useState(false);
    const [thirdFloor, setThirdFloor] = useState(false);
    const [data, setData] = useState(null);

    const navigate = useNavigate();

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

    useEffect(() => {
        GoogleSheetApi.fetchData().then((response) => {
            console.log('response ===========', response)
            setData(response)
        }).catch(error => {
            console.error("Error Occured")
        });
    }, [])
    console.log("outsid lod =============== ", data);

    const handleViewMoreClick = (index) => {
        // Replace '/your-link' with the actual link you want to navigate to
        navigate(`/update/${index}`,  { state: { data: data, updateData:data[index] } });
      };

    return (
        <Grid container>
            <Grid container justifyContent="center" alignContent="center" spacing={2} marginTop="10px">
                <Paper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '99%', textAlign: 'center' }}>
                    <Typography variant="h4">
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
                            {data.map((record, index) => (
                                index > 2 && index < 10 && (

                                    <Typography key={index} variant="h8">

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
                                <Button variant="contained" size="small" onClick={()=>handleViewMoreClick(index)} >
                                            View More
                                    </Button>
                                        <Divider style={{ marginTop: "20px" }} />

                                    </Typography>



                                ))
                            )}
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
                            {data.map((record, index) => (
                                index > 11 && index < 16 && (
                                    <Typography key={index} variant="h8">

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
                                        <Button variant="contained" size="small" onClick={()=>handleViewMoreClick(index)}>
                                            View More
                                    </Button>
                                        <Divider style={{ marginTop: "20px" }} />

                                    </Typography>
                                ))
                            )}
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
                            {data.map((record, index) => (
                                index > 17 && index < 22 && (
                                    <Typography key={index} variant="h8">

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
                                        <Button variant="contained" size="small" onClick={()=>handleViewMoreClick(index)}>
                                            View More
                                    </Button>
                                        <Divider style={{ marginTop: "20px" }} />

                                    </Typography>
                                ))
                            )}
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

                            {data.map((record, index) => (
                                index > 23 && index < 25 && (
                                    <Typography key={index} variant="h8">

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
                                    
                                        <Button variant="contained" size="small" onClick={()=>handleViewMoreClick(index)} >
                                            View More
                                    </Button>
                                        <Divider style={{ marginTop: "20px" }} />

                                    </Typography>
                                ))
                            )}
                        </Paper>
                        : null
                    }

                </Paper>


                {/* <div>
                    {items.map((item, index) => (
                        <div key={index} onClick={(e) => handleClick(e, index)}>
                            <Typography variant="h6">
                                {item.label} <ArrowDropDownIcon />
                            </Typography>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl && selectedItem === index)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <ArrowDropDownIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.details} />
                                </MenuItem>
                            </Menu>
                        </div>
                    ))}
                </div> */}

            </Grid>
        </Grid>
    )
}

// export default function Home() {
//     return (
//         <Grid container>

//             <Grid container justifyContent="center" alignContent="center" direction="column" spacing={2} style={{ height: '100vh' }} >
//                 <Grid item className="tank" />
//                 <Grid item className="top-ceiling" />

//                 <Grid container className="room">
//                     <Grid className="window left" margin="10px"></Grid>
//                     <Grid className="door" marginLeft="50px">
//                         <Typography marginTop="20px" marginLeft="12px">
//                             1
//                         </Typography>
//                     </Grid>
//                 </Grid>

//                 <Grid item className="ceiling" justifyContent="center" alignContent="center">
//                     <Typography align="center" marginBottom="10px">
//                         Third Floor
//                     </Typography>
//                 </Grid>

//                 <Grid container alignItems="center">
//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px">
//                             <Typography marginTop="20px" marginLeft="12px">
//                                 1
//                         </Typography>
//                         </Grid>
//                     </Grid>

//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px">
//                             <Typography marginTop="20px" marginLeft="12px">
//                                 2
//                         </Typography>
//                         </Grid>
//                     </Grid>
//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px">
//                             <Typography marginTop="20px" marginLeft="12px">
//                                 3
//                         </Typography>
//                         </Grid>
//                     </Grid>

//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px">
//                             <Grid item>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     size="small"
//                                     style={{
//                                         width: '40px',
//                                         height: '30px',
//                                         display: 'flex',
//                                         flexDirection: 'column',
//                                         alignItems: 'center',
//                                         justifyContent: 'center',
//                                         minWidth: '0', // Set min-width to 0
//                                         marginTop:'20px'
//                                       }}
//                                 >
//                                     4
//                                  </Button>

//                             </Grid>


//                         </Grid>
//                     </Grid>
//                 </Grid>

//                 <Grid item className="ceiling" justifyContent="center" alignContent="center">
//                     <Typography align="center" marginBottom="10px">
//                         Second Floor
//                     </Typography>
//                 </Grid>
//                 <Grid container>
//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px"></Grid>
//                     </Grid>

//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px"></Grid>
//                     </Grid>
//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px"></Grid>
//                     </Grid>

//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px"></Grid>
//                     </Grid>
//                 </Grid>


//                 <Grid item className="ceiling" justifyContent="center" alignContent="center">
//                     <Typography align="center" marginBottom="10px">
//                         First Floor
//                     </Typography>
//                 </Grid>
//                 <Grid container>
//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px"></Grid>
//                     </Grid>

//                     <Grid container className="house">
//                         <Grid item className="window left" margin="10px" ></Grid>
//                         <Grid item className="window right" margin="10px"></Grid>
//                         <Grid item className="door" marginLeft="50px"></Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid container>
//                     <Grid container className="shop" justifyContent="center" alignItems="center">
//                         <Grid item className="shop-door"></Grid>
//                     </Grid>
//                     <Grid container className="shop" justifyContent="center" alignItems="center">
//                         <Grid item className="shop-door"></Grid>
//                     </Grid>
//                     <Grid container className="shop" justifyContent="center" alignItems="center">
//                         <Grid item className="shop-door"></Grid>
//                     </Grid>
//                     <Grid container className="shop" justifyContent="center" alignItems="center">
//                         <Grid item className="shop-door"></Grid>
//                     </Grid>
//                     <Grid container className="shop" justifyContent="center" alignItems="center">
//                         <Grid item className="shop-door"></Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item className="ceiling" justifyContent="center" alignContent="center">
//                     <Typography align="center" marginBottom="10px">
//                         Ground Floor
//                     </Typography>
//                 </Grid>

//             </Grid>

//         </Grid>

//     )
// }