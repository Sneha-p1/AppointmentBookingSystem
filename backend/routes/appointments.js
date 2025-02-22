const express = require('express');
const Appointment = require('../models/Appointment');

const router = express.Router();

const generateSlots = () => {
  const slots = [];
  for (let hour = 10; hour <= 16; hour++) {
    if (hour !== 13) { // Skip break time (1 PM)
      let period = hour < 12 ? "AM" : "PM";
      let formattedHour = hour > 12 ? hour - 12 : hour; // Convert 24-hour to 12-hour format
      if (hour === 12) period = "PM"; // Fix 12 PM issue

      slots.push(`${formattedHour}:00 ${period}`);
      slots.push(`${formattedHour}:30 ${period}`);
    }
  }
  return slots;
};

// GET Available Slots
router.get('/slots/:date', async (req, res) => {
  const { date } = req.params;
  const bookedSlots = await Appointment.find({ date }).select('time -_id');

  const availableSlots = generateSlots().filter(
    (slot) => !bookedSlots.some((b) => b.time.trim().toLowerCase() === slot.trim().toLowerCase())
  );

  res.json(availableSlots);
});


router.post('/book', async (req, res) => {
    const { name, phone, date, time } = req.body;
  
    // Check if the requested time is in valid slots
    const validSlots = generateSlots();
    if (!validSlots.includes(time.trim())) {
      return res.status(400).json({ message: 'Invalid time slot' });
    }
  
    // Check if the slot is already booked
    const existing = await Appointment.findOne({ date, time });
    if (existing) {
      return res.status(400).json({ message: 'Slot already booked' });
    }
  
    // Save the appointment if valid
    const appointment = new Appointment({ name, phone, date, time });
    await appointment.save();
    res.json({ message: 'Appointment booked successfully' });
});
  
module.exports = router;