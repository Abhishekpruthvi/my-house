import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Grid, Paper, Typography, Button, Divider, TextField, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, MenuItem, Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FirebaseDatastore from './FirebaseDatastore';


export default function UpdateHouseDetails() {

  const location = useLocation();
  const { data } = location.state;
  const [editableData, setEditableData] = useState(data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [month, setMonth] = useState('');
  const [reading, setReading] = useState([]);
  const [readingStringArray, setReadingStringArray] = useState('');
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [year, setYear] = useState(new Date().getFullYear());
  const [rentMonth, setRentMonth] = useState('');
  const [rent, setRent] = useState(0);
  const [rentDialogOpen, setRentDialogOpen] = useState(false);


  const navigate = useNavigate();


  const years = [];
  const currentYear = 2000;
  const lastYear = 2100;
  for (let year = currentYear; year <= lastYear; year++) {
    years.push(year);
  }


  useEffect(() => {
    let sortData = { ...editableData };
    sortData.waterReading = sortData.waterReading.map(reading => {
      // Convert the month object into an array of key-value pairs and sort them
      const sortedMonths = Object.entries(reading.month).sort(([monthA], [monthB]) => {
        const monthAIndex = months.indexOf(monthA);
        const monthBIndex = months.indexOf(monthB);
        return monthAIndex - monthBIndex;
      });


      // Reconstruct the month object
      return {
        ...reading,
        month: Object.fromEntries(sortedMonths)
      };
    });

    sortData.rentDetails = sortData.rentDetails.map(rent => {
      // Convert the month object into an array of key-value pairs and sort them
      const sortedMonths = Object.entries(rent.month).sort(([monthA], [monthB]) => {
        const monthAIndex = months.indexOf(monthA);
        const monthBIndex = months.indexOf(monthB);
        return monthAIndex - monthBIndex;
      });

      // Reconstruct the month object
      return {
        ...rent,
        month: Object.fromEntries(sortedMonths)
      };
    });

    setEditableData(sortData)

  }, [])

  const handleClose = () => {
    setDialogOpen(false);
  }

  const handleRentClose = () => {
    setRentDialogOpen(false);
  }

  const handleOpen = () => {
    setMonth('');
    setReadingStringArray('');
    setDialogOpen(true);
  }

  const handleRentOpen = () => {
    setRentMonth('');
    setRent('');
    setRentDialogOpen(true);
  }


  const handleEditOpen = (month, values) => {
    setMonth(month)
    setReadingStringArray(values.reading.join(','));
    setReading(values.reading)

    setDialogOpen(true);
  }

  const handleRentEditOpen = (month, rent) => {
    setRentMonth(month)
    setRent(rent)

    setRentDialogOpen(true);
  }

  const updateReading = () => {
    let isUpdate = false;
    let updatedRecord = editableData;
    updatedRecord.waterReading.map(record => {
      if (record.year === year) {
        let updateObject = {
          reading: reading,
          cost: 0
        }

        const currentIndex = months.findIndex(mon => mon === month);

        let prevMonthReading;
        let defaultPrevMonthReading = { reading: [] };
        defaultPrevMonthReading.reading.push(reading[0] - 4000);
        if (reading[1]) {
          defaultPrevMonthReading.reading.push(reading[1] - 2000);
        }

        if (currentIndex === 0) {
          prevMonthReading = updatedRecord.waterReading.find(entry => entry.year === (year - 1))?.month.December;
        } else {
          prevMonthReading = record.month[months[currentIndex - 1]];
        }

        prevMonthReading = prevMonthReading ? prevMonthReading : defaultPrevMonthReading
        let cost = 0;

        for (let i = 0; i < reading.length; i++) {
          const difference = reading[i] - prevMonthReading.reading[i];
          const multipliedValue = difference * 0.15;
          cost += multipliedValue;
        }

        updateObject.cost = Number(cost.toFixed(2));
        record.month[month] = updateObject;
        isUpdate = true;
      }
    })

    if (isUpdate === false) {
      let updateObject = {
        reading: reading,
        cost: 0
      }

      let newReading = {
        year: year,
        month: {
          [month]: updateObject
        }
      }

      updatedRecord.waterReading.push(newReading);

    }

    FirebaseDatastore.updateData(updatedRecord).catch(error => {
      console.error("Error Occured")
    });
    setDialogOpen(false);
    navigate(location.pathname, { state: { data: updatedRecord }, replace: true });
  }

  const updateRent = () => {
    // setDialogOpen(false);
    let isUpdate = false;
    let updatedRecord = editableData;
    updatedRecord.rentDetails.map(rentDetail => {
      if (rentDetail.year === year) {
        rentDetail.month[rentMonth] = rent;
        isUpdate = true;
      }
    })

    if (isUpdate === false) {
      let updateObject = {
        reading: reading,
        cost: 0
      }

      let newReading = {
        year: year,
        month: {
          [rentMonth]: rent
        }
      }
      updatedRecord.rentDetails.push(newReading);
    }


    FirebaseDatastore.updateData(updatedRecord).catch(error => {
      console.error("Error Occured")
    });
    setRentDialogOpen(false);
    navigate(location.pathname, { state: { data: updatedRecord }, replace: true });
  }

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleRentMonthChange = (e) => {
    setRentMonth(e.target.value);
  };

  const handleRentChange = (e) => {
    setRent(parseInt(e.target.value));
  };

  const handleReadingChange = (e) => {
    const { name, value } = e.target;
    let readingArray = value.split(",")
    const numberArray = readingArray.map(value => parseInt(value.trim()));
    setReading(numberArray);
    setReadingStringArray(value);
  }

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleCheckBox = (e, values) => {
    values.collected = e.target.checked;
    FirebaseDatastore.updateData(editableData).catch(error => {
      console.error("Error Occured")
    });
    navigate(location.pathname, { state: { data: editableData }, replace: true });

  };



  return (
    <Grid container spacing={2} justifyContent="center" direction="column" alignItems="center">

      <Grid item margin="20px">
        <Typography variant="h6">
          {editableData.floor} | {editableData.houseNumber}
        </Typography>
      </Grid>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={10} md={4}>
          <TextField
            autoFocus
            margin="dense"
            id="year"
            name="year"
            label="Year"
            select
            fullWidth
            value={year}
            onChange={handleYearChange}
          >
            {years.map((year, index) => (
              <MenuItem key={index} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Grid>


      </Grid>
      <Grid container>
        <Grid item xs={12}>

          <Paper style={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Water Reading
          </Typography>

            <Grid container spacing={-2}>

              <Grid item xs={2}>
                <Typography variant="h7" gutterBottom>Month</Typography>
                <Divider />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="h7" gutterBottom>Reading</Typography>
                <Divider />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h7" gutterBottom>Cost | Paid</Typography>
                <Divider />
              </Grid>
              {/* <Grid item xs={1}>
              <Typography variant="h7" gutterBottom>Collected</Typography>
              <Divider/>
            </Grid> */}
              <Grid item xs={1}>
                <Typography variant="h7" gutterBottom>Modify</Typography>
                <Divider />
              </Grid>

            </Grid>

            {editableData.waterReading.map(reading => {
              if (reading.year === year) {
                return (
                  Object.entries(reading.month).map(([month, values]) => (
                    <Grid container key={month} alignItems="center">
                      <Grid item xs={2}>
                        <Typography variant="h8" gutterBottom>{month}</Typography>
                      </Grid>
                      <Grid item xs={5}>
                        <div style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                          {values.reading.map((value, index) => (

                            <Typography key={index} variant="h8">{value} {index != values.reading.length - 1 ? " | " : ""}</Typography>

                          ))}
                        </div>
                      </Grid>
                      <Grid item xs={4}>
                        <>
                          <Typography variant="h8" gutterBottom>{values.cost} |</Typography>
                          <Checkbox checked={values.collected} onChange={(e) => handleCheckBox(e, values)} />
                        </>
                      </Grid>
                      <Grid item xs={1}>
                        <Button color="primary" size="small" onClick={() => handleEditOpen(month, values)}>
                          <EditIcon style={{ cursor: 'pointer', marginBottom: "10px", marginLeft: "-25px" }} />
                        </Button>

                      </Grid>

                    </Grid>
                  ))
                )
              }
            })}

            <Grid container justifyContent="center" marginTop="20px">
              <Button variant="contained" color="primary" size="small" style={{ marginBottom: "10px" }} onClick={handleOpen}>
                Add Reading
            </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {/* ---------------------------------------------------------------------------------------------------- */}

      <Grid container marginTop={"20px"}>
        <Grid item xs={12} >
          <Paper style={{ padding: '2px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Rent Details
                    </Typography>
            <Grid container>
              <Grid item xs={3}>
                <Typography variant="h7" gutterBottom>Month</Typography>
                <Divider />
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h7" gutterBottom>Amount Received</Typography>
                <Divider />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h7" gutterBottom>Modify</Typography>
                <Divider />
              </Grid>
            </Grid>

            {editableData.rentDetails.map(rent => {
              if (rent.year === year) {
                return (
                  Object.entries(rent.month).map(([month, rent]) => (
                    <Grid container key={month} alignItems="center">
                      <Grid item xs={3}>
                        <Typography variant="h8" gutterBottom>{month}</Typography>
                      </Grid>
                      <Grid item xs={7}>
                        <Typography variant="h8">{rent}</Typography>
                      </Grid>

                      <Grid item xs={2} justifyContent="flex-end">
                        <Button color="primary" size="small" onClick={() => handleRentEditOpen(month, rent)}>
                          <EditIcon style={{ cursor: 'pointer', marginBottom: "10px" }} />
                        </Button>

                      </Grid>

                    </Grid>
                  ))
                )
              }
            })}

            <Grid container justifyContent="center" marginTop="20px">
              <Button variant="contained" color="primary" size="small" style={{ marginBottom: "10px" }} onClick={handleRentOpen}>
                Add Rent
            </Button>
            </Grid>

          </Paper>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>Add Reading</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Month and Reading : (if multiple reading available add values with comma like 234,645)</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="month"
            name="month"
            label="Month"
            select
            fullWidth
            value={month}
            onChange={handleMonthChange}
          >
            {months.map((monthName, index) => (
              <MenuItem key={index} value={monthName}>
                {monthName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="reading"
            name="reading"
            label="Reading"
            type="text"
            fullWidth
            value={readingStringArray}
            onChange={handleReadingChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={updateReading}>Save</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={rentDialogOpen} onClose={handleClose}>
        <DialogTitle>Add Rent</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the Month and Rent</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="rentmonth"
            name="rentmonth"
            label="Month"
            select
            fullWidth
            value={rentMonth}
            onChange={handleRentMonthChange}
          >
            {months.map((monthName, index) => (
              <MenuItem key={index} value={monthName}>
                {monthName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="rent"
            name="rent"
            label="Rent"
            type="text"
            fullWidth
            value={rent}
            onChange={handleRentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRentClose}>Cancel</Button>
          <Button onClick={updateRent}>Save</Button>
        </DialogActions>
      </Dialog>


    </Grid>


  );
}