// src/routes/patients.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware); // Protect all patient routes

router.get('/', patientController.getPatients);
router.post('/', patientController.createPatient);
router.get('/:id', patientController.getPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;