// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectTheme: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
    enum: ['For Business', 'For Personal', 'For Educational'],
  },
  type: {
    type: String,
    required: true,
    enum: ['Internal', 'External'],
  },
  division: {
    type: String,
    required: true,
    enum: ['Filters', 'Analytics', 'Development'],
  },
  department: {
    type: String,
    required: true,
    enum: ['Strategy', 'Marketing', 'Finance'],
  },
  category: {
    type: String,
    required: true,
    enum: ['Quality A', 'Quality B', 'Quality C'],
  },
  priority: {
    type: String,
    required: true,
    enum: ['High', 'Medium', 'Low'],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: ['Pune', 'Mumbai', 'Bangalore'],
  },
  status: {
    type: String,
    default: 'Registered',
  },
}, { timestamps: true });

const ProjectModel =  mongoose.model("project", projectSchema);
module.exports = ProjectModel

