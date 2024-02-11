import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  Grid, Paper, Typography, Button, Divider, TextField, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GoogleSheetApi from './GoogleSheetApi';
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
  const [rentMonth, setRentMonth] = useState('');
  const [rent, setRent] = useState('');
  const [rentDialogOpen, setRentDialogOpen] = useState(false);


  useEffect(() => {
    console.log("waht in data---------------------- ", data)
    let sortData = { ...editableData };
    sortData.waterReading = sortData.waterReading.map(reading => {
      // Convert the month object into an array of key-value pairs and sort them
      const sortedMonths = Object.entries(reading.month).sort(([monthA], [monthB]) => {
        const monthAIndex = months.indexOf(monthA);
        const monthBIndex = months.indexOf(monthB);
        return monthAIndex - monthBIndex;
      });

      console.log("sorted month -------------------------- ", sortedMonths)

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

      console.log("sorted month -------------------------- ", sortedMonths)

      // Reconstruct the month object
      return {
        ...rent,
        month: Object.fromEntries(sortedMonths)
      };
    });
    console.log("now in data ====================== ", sortData)

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
    setReadingStringArray(values.join(','));

    setDialogOpen(true);
  }

  const handleRentEditOpen = (month, rent) => {
    setRentMonth(month)
    setRent(rent)

    setRentDialogOpen(true);
  }

  const updateReading = () => {
    // setDialogOpen(false);
    let updatedRecord = editableData;
    updatedRecord.waterReading.map(record => {
      if (record.year === new Date().getFullYear()) {
        console.log("record ===================", record)
        let updateObject = {
          reading:reading,
          cost:0
        }

        const currentIndex = months.findIndex(mon => mon === month);

        let prevMonthReading;
        let defaultPrevMonthReading = [];
        defaultPrevMonthReading.push(reading[0]-5000);
        if(reading[1]) {
          defaultPrevMonthReading.push(reading[0]-2000);
        }

        // If the current month is the first month, return undefined
        if (currentIndex === 0) {
          // or handle the edge case as per your requirement
          
          prevMonthReading = updatedRecord.waterReading.find(entry => entry.year === (new Date().getFullYear()) - 1)?.month.December?.reading;
          prevMonthReading = prevMonthReading ? prevMonthReading : defaultPrevMonthReading
        } else {
          prevMonthReading = record.month[months[currentIndex - 1]];
        }
        let cost = 0;

        for (let i = 0; i < reading.length; i++) {
          // Subtract corresponding elements from array2 from array1
          const difference = reading[i] - prevMonthReading[i];

          // Multiply the difference by 0.15
          const multipliedValue = difference * 0.15;

          // Add the multiplied value to the sum
          cost += multipliedValue;
        }
        updateObject.cost = cost;
        record.month[month] = updateObject;
      }
    })
    console.log("updated record================= ", updatedRecord)
    FirebaseDatastore.updateData(updatedRecord).catch(error => {
      console.error("Error Occured")
    });
    setDialogOpen(false);
  }

  const updateRent = () => {
    // setDialogOpen(false);
    let updatedRecord = editableData;
    updatedRecord.rentDetails.map(rentDetail => {
      if (rentDetail.year === new Date().getFullYear()) {
        rentDetail.month[rentMonth] = rent;
      }
    })
    console.log("updated Rent record================= ", updatedRecord)
    FirebaseDatastore.updateData(updatedRecord).catch(error => {
      console.error("Error Occured")
    });
    setRentDialogOpen(false);
  }

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleRentMonthChange = (e) => {
    console.log("------------------- mint -- ", e.target.month, "--", e.target.reading, "--", e.target.value)
    setRentMonth(e.target.value);
  };

  const handleRentChange = (e) => {
    setRent(e.target.value);
  };

  const handleReadingChange = (e) => {
    const { name, value } = e.target;
    let readingArray = value.split(",")
    console.log("reading array --------------------", readingArray)
    const numberArray = readingArray.map(value => parseInt(value.trim()));
    setReading(numberArray);
    setReadingStringArray(value);
  }

  return (
    <Grid container spacing={2} justifyContent="center" direction="column" alignItems="center">

      <Grid item>
        <Typography variant="h6">
          {editableData.floor} | {editableData.houseNumber}
        </Typography>
      </Grid>

      <Grid item width="100%">
        <Paper style={{ padding: "10px", textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Water Reading
          </Typography>

          <Grid container>
            <Grid item xs={3}>
              <Typography variant="h6" gutterBottom>Month</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h6" gutterBottom>Reading</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" gutterBottom>Modify</Typography>
            </Grid>
          </Grid>

          {editableData.waterReading.map(reading => {
            if (reading.year === new Date().getFullYear()) {
              return (
                Object.entries(reading.month).map(([month, values]) => (
                  console.log("what if values ================ ", values),
                  <Grid container key={month} alignItems="center">
                    <Grid item xs={3}>
                      <Typography variant="h8" gutterBottom>{month}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <div style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        {values.reading.map((value, index) => (
                          <Typography key={index} variant="h8" style={{ margin: '0 5px 0 20px' }}>{value}</Typography>
                        ))}
                      </div>
                    </Grid>

                    <Grid item xs={2} justifyContent="flex-end">
                      <Button color="primary" size="small" onClick={() => handleEditOpen(month, values)}>
                        <EditIcon style={{ cursor: 'pointer', marginBottom: "10px" }} />
                      </Button>

                    </Grid>

                  </Grid>
                ))
              )
            }
          })}

          <Grid container justifyContent="center" marginTop="20px">
            <Button variant="contained" color="primary" size="small" onClick={handleOpen}>
              Add Reading
            </Button>
          </Grid>
        </Paper>
      </Grid>


      {/* ---------------------------------------------------------------------------------------------------- */}

      <Grid item width="100%">
        <Paper style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Rent Details
                    </Typography>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="h6" gutterBottom>Month</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="h6" gutterBottom>Reading</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6" gutterBottom>Modify</Typography>
            </Grid>
          </Grid>

          {editableData.rentDetails.map(rent => {
            if (rent.year === new Date().getFullYear()) {
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
            <Button variant="contained" color="primary" size="small" onClick={handleRentOpen}>
              Add Rent
            </Button>
          </Grid>

        </Paper>
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