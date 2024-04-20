//Middleware to handle asynchronous routes
const asyncHandler = require("express-async-handler");

//Models required for report operations
const { ReportModel, ReportLogModel } = require("../models/reportModel");
const { StudentUser } = require("../models/userModel");

////////admin actions
const getAllReport = asyncHandler(async (req, res) => {
  const all = await ReportModel.find({});
  res.status(200).json(all);
});

const getByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { isAdmin } = req.user;

  if (!isAdmin) {
    res.status(400);
    throw new Error("Not authorized");
  }
  const capitalizedCategory = capitalizeFirstLetter(category);

  // Find reports by category
  const reports = await ReportModel.find({ category: capitalizedCategory });

  res.status(200).json(reports);
});

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const getByDorm = asyncHandler(async (req, res) => {
  const { dorm } = req.params;
  const { isAdmin } = req.user;

  if (!isAdmin) {
    res.status(400);
    throw new Error("Not authorized");
  }
  const capitalizedDorm = dorm.toUpperCase();

  // Find reports by dorm
  const reports = await ReportModel.find({ dorm: capitalizedDorm });

  res.status(200).json(reports);
});

const updateReportStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { isAdmin } = req.user;

  if (!isAdmin) {
    res.status(400);
    throw new Error("Not authorized");
  }

  // Validate that status is provided
  if (!status) {
    res.status(400);
    throw new Error("Status is required!");
  }

  // Find the report by id and update its status
  const report = await ReportModel.findById(id);
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  const allowedStatus = ["Pending", "Recived", "Assigned", "Completed"];
  if (!allowedStatus.includes(status)) {
    res.status(400);
    throw new Error(
      "Invalid Status! Allowed categories are: Pending, Recived, Assigned, Completed"
    );
  }

  report.statu = status;
  await report.save();

  res.status(200).json(report);
});

const getAllStudents = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    res.status(400);
    throw new Error("Not authorized");
  }

  const users = await StudentUser.find({}).select(
    "email user_id room_number dorm"
  );

  res.status(200).json(users);
});

const getLoggedReports = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    res.status(400);
    throw new Error("Not authorized");
  }

  const reports = await ReportLogModel.find({});

  res.status(200).json(reports);
});

const getLoggedReportsByCategory = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;
  const { category } = req.params;
  if (!isAdmin) {
    res.status(400);
    throw new Error("Not authorized");
  }

  const reports = await ReportLogModel.find({ category: category });

  res.status(200).json(reports);
});
module.exports = {
  getAllReport,
  updateReportStatus,
  getAllStudents,
  getByDorm,
  getByCategory,
  getLoggedReports,
  getLoggedReportsByCategory,
};
