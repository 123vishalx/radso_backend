const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Blog = require('../models/Blogs');

// Get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('category');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new blog
exports.createBlog = async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
        image: req.body.image
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    try {
        const blog = await Blog.findById(ObjectId(id));
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        await blog.remove();
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid blog ID" });
    }

    if (req.body.category && !ObjectId.isValid(req.body.category)) {
        return res.status(400).json({ message: "Invalid category ID" });
    }

    try {
        const blog = await Blog.findById(ObjectId(id));
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.author = req.body.author || blog.author;
        blog.category = req.body.category || blog.category;
        blog.image = req.body.image || blog.image;
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
