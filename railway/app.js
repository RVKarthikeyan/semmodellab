// Fetch train data
async function fetchTrains() {
    const response = await fetch('server.php');
    const trains = await response.json();

    // Populate train list
    const trainListDiv = document.getElementById('trainList');
    trainListDiv.innerHTML = '';
    trains.forEach(train => {
        trainListDiv.innerHTML += `
            <p>
                <strong>${train.train_name}</strong> - 
                Available Seats: ${train.available_seats}
            </p>
        `;
    });

    // Populate train selector
    const trainSelector = document.getElementById('trainSelector');
    trainSelector.innerHTML = '<option value="">Select Train</option>';
    trains.forEach(train => {
        trainSelector.innerHTML += `
            <option value="${train.id}">${train.train_name}</option>
        `;
    });
}

// Handle booking
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const train_id = document.getElementById('trainSelector').value;
    const passenger_name = document.getElementById('passengerName').value;

    if (!train_id || !passenger_name) {
        alert("Please fill all fields!");
        return;
    }

    const response = await fetch('server.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `train_id=${train_id}&passenger_name=${passenger_name}`
    });

    alert(await response.text());
    fetchTrains(); // Refresh train data
});

// Initialize
fetchTrains();
