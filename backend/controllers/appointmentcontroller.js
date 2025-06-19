const Appointment = require('../models/Appointment');

// Book an appointment — only by patients
exports.bookAppointment = async (req, res) => {
  const { patientName, patientEmail, doctorName, appointmentDate, appointmentTime } = req.body;

  if (req.user.role !== 'patient') {
    return res.status(403).json({ message: 'Only patients can book appointments' });
  }

  try {
    const newAppointment = new Appointment({
      patientName,
      patientEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
    });

    const appointment = await newAppointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// View appointments — only admin/doctor can see all
exports.getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === 'admin') {
      appointments = await Appointment.find();
    } else if (req.user.role === 'patient') {
      appointments = await Appointment.find({ patientEmail: req.user.email });
    } else if (req.user.role === 'doctor') {
      appointments = await Appointment.find({ doctorName: req.user.name });
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update appointment status — only admin
exports.updateAppointmentStatus = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can update appointment status' });
  }

  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
