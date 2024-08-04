const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController'); // Adjust the path as needed

// Route to handle form submission
router.post('/', formController.processFormData);

// Route to get all form data
router.get('/', formController.getFormData);

// Route to update form data by ID
router.put('/data/:id', formController.updateFormData);

// Route to delete form data by ID
router.delete('/data/:id', formController.deleteFormData);

module.exports = router;
