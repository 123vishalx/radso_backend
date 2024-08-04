const FormData = require('../models/formdata'); // Ensure the correct path and casing for your model

// Controller to process form data
exports.processFormData = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Create a new form data entry
        const formData = new FormData({
            name,
            email,
            message
        });

        // Save the form data to the database
        const savedFormData = await formData.save();

        // Send a success response
        res.status(201).json({ message: 'Form submitted successfully', data: savedFormData });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to retrieve all form data
exports.getFormData = async (req, res) => {
    try {
        // Find all form data entries
        const formData = await FormData.find();

        // Send the retrieved data as a response
        res.json(formData);
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to update form data by ID
exports.updateFormData = async (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;

    try {
        // Find the form data entry by ID and update it
        const updatedFormData = await FormData.findByIdAndUpdate(
            id,
            { name, email, message },
            { new: true, runValidators: true }
        );

        if (!updatedFormData) {
            return res.status(404).json({ message: 'Form data not found' });
        }

        // Send a success response
        res.json({ message: 'Form data updated successfully', data: updatedFormData });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};

// Controller to delete form data by ID
exports.deleteFormData = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the form data entry by ID and delete it
        const deletedFormData = await FormData.findByIdAndDelete(id);

        if (!deletedFormData) {
            return res.status(404).json({ message: 'Form data not found' });
        }

        // Send a success response
        res.json({ message: 'Form data deleted successfully' });
    } catch (err) {
        // Handle errors
        res.status(500).json({ message: err.message });
    }
};
