const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careercontroller'); // Adjust the path as needed

// Route to create a new career entry
router.post('/', careerController.createCareer);

// Route to get all career entries
router.get('/', careerController.getCareers);

// Route to update a career entry by ID
router.put('/:id', careerController.updateCareer);

// Route to delete a career entry by ID
router.delete('/:id', careerController.deleteCareer);

module.exports = router;
