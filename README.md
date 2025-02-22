# Appointment Booking System
# Spa Booking System

This is a complete Appointment Booking System that includes:

A **Node.js + Express** backend with **MongoDB** for storing appointments.
A **reusable frontend plugin** built using HTML, CSS, and vanilla JavaScript to allow users to view available appointment slots and book appointments.
A clear project structure for both backend APIs and the frontend plugin.

---

## Backend Overview

The backend is built using **Node.js**, **Express**, and **MongoDB**.

### Features:
**Appointment Slots:**  
  - Generates 30-minute intervals between 10:00 AM and 5:00 PM.
  - Excludes the break period between 1:00 PM and 2:00 PM.
**Booking API:**  
  - Allows users to book an appointment by providing name, phone, date, and selected time slot.
  - Validates time slot to prevent booking during break time and double-booking.
**Slot Availability API:**  
  - Fetches available time slots for a specific date.

### API Endpoints:
**GET** /api/slots/:date  
  - Returns an array of available time slots for the given date.
**POST** /api/book  
  - Books an appointment if the slot is valid and not already booked.
  - Expects a JSON payload:
   json
    {
      "name": "Sneha",
      "phone": "6666666666",
      "date": "YYYY-MM-DD",
      "time": "10:00 AM"
    }
   
---

## Frontend Plugin Overview

The frontend plugin is a self-contained JavaScript file (**booking.js**) that can be embedded into any webpage to display the booking widget.

### Features:
**Date Picker & Time Slot Dropdown:**  
  - Allows users to select a date.
  - Fetches available time slots from the backend.
**Booking Form:**  
  - Users can enter their name and phone number.
  - Submits a booking request to the backend.
**Dynamic UI:**  
  - Provides feedback (success/error messages) based on the booking status.
**Reusable:**  
  - Easily embedded on any webpage by including a <script> tag.

---

## How to Run the Project Locally

### **Clone the Repository**
```sh
git clone git@github.com:Sneha-p1/AppointmentBookingSystem.git
```

### Prerequisites:
**Node.js & npm:** Install from [nodejs.org](https://nodejs.org/).
**MongoDB:** Ensure MongoDB is installed and running (default URL: mongodb://localhost:27017/appointments).

### Running the Backend:
1. Navigate to the backend folder:
   ```bash
   cd project/backend
   ```
2. Install dependencies:
   
   ```bash
    npm install

3. Start the server:
   ```bash
      node server.js

The backend will run on http://localhost:5000.

### Running the Frontend:
1. Navigate to the frontend folder:
   ```bash
      cd project/frontend
2. Serve the frontend files using a static server:

- Node.js serve package:

```bash
npm install -g serve
serve .
```
Open index.html in your browser to view the booking widget.

### Embedding the Plugin on a Webpage

```bash
<script>
  window.bookingWidgetConfig = {
    apiBaseUrl: 'http://localhost:5000/api' 
  };
</script>

<div id="booking-widget"></div>

<script src="path/to/bookingWidget.js"></script>
```

If the container with the ID booking-widget exists, the plugin will render inside it. Otherwise, it will create the container automatically.
Adjust the apiBaseUrl if your backend is hosted on a different domain.
