const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/SpaAppointment");
const database = mongoose.connection;
database.on("error", (error) => {
    console.log(error);
});
database.once("connected", () => {
    console.log("Database connected");
});


app.use('/api', appointmentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

