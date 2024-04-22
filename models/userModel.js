const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true],
    unique: true,
  },
  password: {
    type: String,
    required: [true],
  },
  user_id: {
    type: String,
    required: [true],
    unique: true,
  },
  first_name: {
    type: String,
    required: [true],
  },
  last_name: {
    type: String,
    required: [true],
  },
  room_number: {
    type: Number,
    required: [true],
  },
  dorm: {
    type: String,
    required: [true],
  },
  room_type: {
    type: String,
    required: [true],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true],
  },
  password: {
    type: String,
    required: [true],
  },
  user_id: {
    type: String,
    required: [true],
  },
  first_name: {
    type: String,
    required: [true],
  },
  last_name: {
    type: String,
    required: [true],
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

// Define and export models
const StudentUser = mongoose.model("StudentUser", studentSchema);
const AdminUser = mongoose.model("AdminUser", adminSchema);

module.exports = {
  StudentUser,
  AdminUser,
};
