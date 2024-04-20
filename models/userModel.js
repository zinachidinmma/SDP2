const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  user_id: {
    type: String,
    required: [true, "Please enter a student ID"],
    unique: true,
  },
  first_name: {
    type: String,
    required: [true, "Please enter a first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please enter a second name"],
  },
  room_number: {
    type: Number,
    required: [true, "Please enter you room number"],
  },
  dorm: {
    type: String,
    required: [true, "Please enter your dorm"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  user_id: {
    type: String,
    required: [true, "Please enter a student ID"],
    unique: true,
  },
  first_name: {
    type: String,
    required: [true, "Please enter a first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please enter a second name"],
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
