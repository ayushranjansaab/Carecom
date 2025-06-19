// Handle appointment booking
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
  appointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return alert('You must login first');

    const appointment = {
      patientName: document.getElementById('patientName').value,
      patientEmail: document.getElementById('patientEmail').value,
      doctorName: document.getElementById('doctorName').value,
      appointmentDate: document.getElementById('appointmentDate').value,
      appointmentTime: document.getElementById('appointmentTime').value
    };

    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(appointment)
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Failed to book appointment');
        return;
      }

    alert('Appointment booked successfully!');
    document.getElementById('appointmentForm').reset();
    loadAppointments(); // refresh list

    } catch (err) {
      alert('Booking failed');
    }
  });
}

// Load appointments
async function loadAppointments() {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await fetch('http://localhost:5000/api/appointments', {
      headers: { Authorization: `Bearer ${token}` }
    });

    const appointments = await res.json();
    const list = document.getElementById('appointmentsList');
    list.innerHTML = ''; // Clear old appointments


    appointments.forEach((a) => {
      const li = document.createElement('li');
      li.innerText = `${a.appointmentDate.split('T')[0]} – ${a.doctorName} @ ${a.appointmentTime}`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error(err);
  }
}

if (document.getElementById('appointmentsList')) {
  loadAppointments();
}
