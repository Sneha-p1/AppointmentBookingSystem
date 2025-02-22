(function () {
    var config = window.bookingWidgetConfig || {};
    var apiBaseUrl = config.apiBaseUrl || 'http://localhost:5000/api';
  
    var container = document.getElementById('booking-widget');
    if (!container) {
      container = document.createElement('div');
      container.id = 'booking-widget';
      document.body.appendChild(container);
    }
  
    // Inject CSS styles
    var style = document.createElement('style');
    style.innerHTML = `
      #booking-widget {
        font-family: Arial, sans-serif;
        max-width: 400px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 2px 2px 12px rgba(0,0,0,0.1);
      }
      #booking-widget h2 {
        text-align: center;
      }
      #booking-widget label {
        display: block;
        margin-top: 10px;
      }
      #booking-widget input,
      #booking-widget select,
      #booking-widget button {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
      #booking-widget button {
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
      }
      #booking-widget button:hover {
        background-color: #45a049;
      }
      #booking-widget .message {
        margin-top: 10px;
        padding: 10px;
        border-radius: 4px;
      }
      #booking-widget .error {
        background-color: #f8d7da;
        color: #721c24;
      }
      #booking-widget .success {
        background-color: #d4edda;
        color: #155724;
      }
    `;
    document.head.appendChild(style);
  

    // Build the HTML structure 
    container.innerHTML = `
      <h2>Appointment Booking</h2>
      <label for="appointment-date">Select Date:</label>
      <input type="date" id="appointment-date" />
  
      <label for="appointment-time">Select Time Slot:</label>
      <select id="appointment-time">
        <option value="">--Select a Time Slot--</option>
      </select>
  
      <label for="appointment-name">Your Name:</label>
      <input type="text" id="appointment-name" placeholder="Enter your name" />
  
      <label for="appointment-phone">Phone Number:</label>
      <input type="text" id="appointment-phone" placeholder="Enter your phone number" />
  
      <button id="book-appointment">Book Appointment</button>
      <div id="booking-message"></div>
    `;
  
    var dateInput = container.querySelector('#appointment-date');
    var timeSelect = container.querySelector('#appointment-time');
    var nameInput = container.querySelector('#appointment-name');
    var phoneInput = container.querySelector('#appointment-phone');
    var bookButton = container.querySelector('#book-appointment');
    var messageDiv = container.querySelector('#booking-message');
  
   
    function showMessage(msg, type) {
      messageDiv.textContent = msg;
      messageDiv.className = 'message ' + (type || '');
    }
  

    dateInput.addEventListener('change', function () {
      var date = dateInput.value;
      if (!date) return;
     
      timeSelect.innerHTML = '<option value="">--Select a Time Slot--</option>';
      fetch(apiBaseUrl + '/slots/' + date)
        .then(function (response) {
          return response.json();
        })
        .then(function (slots) {
          slots.forEach(function (slot) {
            var option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            timeSelect.appendChild(option);
          });
        })
        .catch(function (err) {
          showMessage('Error fetching slots: ' + err.message, 'error');
        });
    });
  
    bookButton.addEventListener('click', function () {
      var date = dateInput.value;
      var time = timeSelect.value;
      var name = nameInput.value;
      var phone = phoneInput.value;
  
      if (!date || !time || !name || !phone) {
        showMessage('Please fill in all fields', 'error');
        return;
      }
  
      fetch(apiBaseUrl + '/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          date: date,
          time: time
        })
      })
        .then(function (response) {
          if (!response.ok) {
            return response.json().then(function (data) {
              throw new Error(data.message || 'Error booking appointment');
            });
          }
          return response.json();
        })
        .then(function (data) {
          showMessage(data.message, 'success');
          dateInput.dispatchEvent(new Event('change'));
        })
        .catch(function (err) {
          showMessage(err.message, 'error');
        });
    });
  })();
  

