const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  statu: {
    type: String,
  },
  room_number: {
    type: Number,
    required: [true, "Please enter you room number"],
  },
  dorm: {
    type: String,
    required: [true, "Please enter your dorm"],
  },
  date: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
});

const reportLogSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  room_number: {
    type: Number,
    required: [true, "Please enter you room number"],
  },
  dorm: {
    type: String,
    required: [true, "Please enter your dorm"],
  },
  date: {
    type: Date,
  },
  date_completed: {
    type: Date,
    default: Date.now, // Set default value to current date and time
  },
});

const ReportModel = mongoose.model("Report", reportSchema);
const ReportLogModel = mongoose.model("ReportLog", reportLogSchema);

module.exports = {
  ReportModel,
  ReportLogModel,
};
