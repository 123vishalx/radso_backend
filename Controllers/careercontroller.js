const Career = require('../models/Career'); // Ensure the correct path and casing for your model

// Controller to create a new career entry
exports.createCareer = async (req, res) => {
    const { title, image, details } = req.body;

    try {
        // Create a new career entry
        const career = new Career({
            title,
            image,
            details
        });

        // Save the career entry to the database
        const savedCareer = await career.save();

        // Send a success response
        res.status(201).json({ message: 'Career entry created successfully', data: savedCareer });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to retrieve all career entries
exports.getCareers = async (req, res) => {
    try {
        // Find all career entries
        const careers = await Career.find();

        // Send the retrieved data as a response
        res.json(careers);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to update a career entry by ID
exports.updateCareer = async (req, res) => {
    const { id } = req.params;
    const { title, image, details } = req.body;

    try {
        // Find the career entry by ID and update it
        const updatedCareer = await Career.findByIdAndUpdate(
            id,
            { title, image, details },
            { new: true, runValidators: true }
        );

        if (!updatedCareer) {
            return res.status(404).json({ message: 'Career entry not found' });
        }

        // Send a success response
        res.json({ message: 'Career entry updated successfully', data: updatedCareer });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to delete a career entry by ID
exports.deleteCareer = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the career entry by ID and delete it
        const deletedCareer = await Career.findByIdAndDelete(id);

        if (!deletedCareer) {
            return res.status(404).json({ message: 'Career entry not found' });
        }

        // Send a success response
        res.json({ message: 'Career entry deleted successfully' });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};
