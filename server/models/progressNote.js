const mongoose = require('mongoose');

const progressNoteSchema = new mongoose.Schema({
  projectCode: { type: String, required: true },
  projectName: { type: String, required: true },
  date: { type: Date, required: true },
  currentStatus: { type: String, required: true },
  teamMember: { type: String, required: true },
  progressNote: { type: String, required: true }
});

module.exports = mongoose.model(
  'ProgressNote',
  progressNoteSchema,
  'ProgressNotes'
);