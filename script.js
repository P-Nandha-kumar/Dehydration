// Dummy sensor values for testing
// Change these variables to see the status change!
const sweatLevel = 85; // %
const bodyTemp = 39.0; // °C
const heartRate = 110; // bpm
const skinImpedance = 600; // ohms

// 1. Get DOM elements by their IDs
const sweatEl = document.getElementById('sweat-level');
const tempEl = document.getElementById('body-temp');
const heartEl = document.getElementById('heart-rate');
const impedanceEl = document.getElementById('skin-impedance');
const statusTextEl = document.getElementById('hydration-status');
const alertBox = document.getElementById('alert-box');

// 2. Update the card values with our mock data
sweatEl.textContent = sweatLevel;
tempEl.textContent = bodyTemp;
heartEl.textContent = heartRate;
impedanceEl.textContent = skinImpedance;

// 3. Simple function to determine hydration state
function updateStatus() {
  let status = "Hydrated";
  let statusClass = "status-hydrated"; // Default to green

  // Evaluation Logic
  if (sweatLevel >= 80 || bodyTemp >= 38.5) {
    status = "Severe Dehydration";
    statusClass = "status-severe";
  } else if (sweatLevel >= 60 || bodyTemp >= 37.5) {
    status = "Mild Dehydration";
    statusClass = "status-mild";
  }

  // Apply text and color to DOM
  statusTextEl.textContent = status;
  statusTextEl.className = statusClass; // This applies the correct CSS color

  // Alert Box visibility logic
  if (status === "Severe Dehydration") {
    alertBox.classList.remove('hidden'); // Show alert
  } else {
    alertBox.classList.add('hidden'); // Hide alert
  }
}

// 4. Execute the function to set the page state
updateStatus();
