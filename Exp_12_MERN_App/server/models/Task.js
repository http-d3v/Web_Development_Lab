/**
 * Task Schema Definition for MongoDB / Mongoose
 * Experiment 12: MERN Stack Task Management
 * Student: Dev Kumar Tiwari (2nd Year B.Tech CSE Data Science)
 */

// Production Mongoose Schema Structure (when connected to MongoDB Atlas)
const TaskSchemaDefinition = {
  title: {
    type: String,
    required: [true, 'Task title is required.'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters.']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    enum: ['Data Structures', 'Data Science', 'DBMS', 'Web Development', 'Personal'],
    default: 'Web Development'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  dueDate: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
};

module.exports = {
  TaskSchemaDefinition
};
