document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Unauthorized. Please login.");
    window.location.href = "login.html";
    return;
  }

  loadAppointments(token);
  loadPatients(token);
});

function loadAppointments(token) {
  fetch('http://localhost:5000/api/appointments/doctor', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('appointments-container');
      if (!data.length) {
        container.innerHTML = "<p>No upcoming appointments.</p>";
        return;
      }

      container.innerHTML = data.map(app => `
        <div class="card">
          <p><strong>Patient:</strong> ${app.patientName}</p>
          <p><strong>Date:</strong> ${new Date(app.appointmentDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${app.appointmentTime}</p>
          <p><strong>Status:</strong> ${app.status}</p>
        </div>
      `).join('');
    })
    .catch(err => console.error('Error fetching appointments:', err));
}

function loadPatients(token) {
  fetch('http://localhost:5000/api/appointments/patients', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('patients-container');
      if (!data.length) {
        container.innerHTML = "<p>No patients found.</p>";
        return;
      }

      container.innerHTML = data.map(p => `
        <div class="card">
          <p><strong>Name:</strong> ${p.name}</p>
          <p><strong>Email:</strong> ${p.email}</p>
        </div>
      `).join('');
    })
    .catch(err => console.error('Error fetching patients:', err));
}

function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
