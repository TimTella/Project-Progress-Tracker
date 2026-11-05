const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Project = require('./models/project');
const ProgressNote = require('./models/progressNote');

// Create the Express application
const app = express();

// Allow HTTP requests from Angular
app.use(cors({ origin: 'http://localhost:4200' }));

// Read JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/IT6203')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB error:', err));


// GET: Retrieve all projects
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving projects'
    });
  }
});


// POST: Create a new project
app.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({
      message: 'Error saving project',
      error: err.message
    });
  }
});


// GET: Retrieve a project by ID
app.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({
      message: 'Invalid project ID'
    });
  }
});


// PUT: Update an existing project
app.put('/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({
      message: 'Error updating project',
      error: err.message
    });
  }
});


// DELETE: Remove a project
app.delete('/projects/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    res.status(200).json({
      message: 'Project deleted successfully'
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error deleting project'
    });
  }
});

// Progress Notes Section

app.get('/progress-notes', async (req, res) => {
  try {
    res.status(200).json(await ProgressNote.find());
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving progress notes' });
  }
});

app.post('/progress-notes', async (req, res) => {
  try {
    const saved = await new ProgressNote(req.body).save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Error saving progress note', error: err.message });
  }
});

app.get('/progress-notes/:id', async (req, res) => {
  try {
    const note = await ProgressNote.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Progress note not found' });
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ message: 'Invalid progress note ID' });
  }
});

app.put('/progress-notes/:id', async (req, res) => {
  try {
    const updated = await ProgressNote.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Progress note not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Error updating progress note', error: err.message });
  }
});

app.delete('/progress-notes/:id', async (req, res) => {
  try {
    const deleted = await ProgressNote.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Progress note not found' });
    res.status(200).json({ message: 'Progress note deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting progress note' });
  }
});

// Start the Express server
app.listen(8001, () => {
  console.log('MongoDB server running on port 8001');
});