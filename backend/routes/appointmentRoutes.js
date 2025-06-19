// // backend/routes/appointmentRoutes.js
// const express = require('express');
// const router = express.Router();
// const Appointment = require('../models/Appointment');
// const auth = require('../middleware/auth');

// // Protect the appointment booking route
// router.post('/book', auth, async (req, res) => {
//   const { patientName, doctorName, date, time } = req.body;
//   const appointment = new Appointment({ patientName, doctorName, date, time });
//   await appointment.save();
//   res.json({ msg: 'Appointment booked' });
// });

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointmentcontroller');

const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Route for booking an appointment — protected
router.post('/', auth, bookAppointment);

// Route for viewing all appointments — protected
router.get('/', auth, getAppointments);

// Route for updating appointment status — protected
router.put('/:appointmentId/status', auth, updateAppointmentStatus);

// ✅ NEW: Get appointments for the logged-in doctor
router.get('/doctor', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const appointments = await Appointment.find({ doctorName: req.user.name });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ NEW: Get list of all patients (admin only)
router.get('/patients', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const patients = await User.find({ role: 'patient' }).select('-password');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
