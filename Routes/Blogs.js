const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/auth');

// Get all blogs (public)
router.get('/', BlogController.getBlogs);

// Create a new blog (admin only)
router.post('/', authMiddleware.verifyAdmin, BlogController.createBlog);

// Update a blog (admin only)
router.put('/:id', authMiddleware.verifyAdmin, BlogController.updateBlog);

// Delete a blog (admin only)
router.delete('/:id', authMiddleware.verifyAdmin, BlogController.deleteBlog);

module.exports = router;
