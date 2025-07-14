// src/routes/appointments.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', appointmentController.getAppointments);
router.post('/', appointmentController.createAppointment);
router.get('/:id', appointmentController.getAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);
router.post('/:id/confirm', appointmentController.confirmAppointment);

module.exports = router;
