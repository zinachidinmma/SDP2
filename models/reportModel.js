const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  statu: {
    type: String,
  },
  room_number: {
    type: Number,
    required: true,
  },
  room_type: {
    type: String,
    required: true,
  },
  dorm: {
    type: String,
    required: true,
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
    required: true,
  },
  room_number: {
    type: Number,
    required: true,
  },
  room_type: {
    type: String,
    required: true,
  },
  dorm: {
    type: String,
    required: true,
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
