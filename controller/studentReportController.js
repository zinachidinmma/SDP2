//Middleware to handle asynchronous routes
const asyncHandler = require("express-async-handler");

//Models required for report operations
const { ReportModel, ReportLogModel } = require("../models/reportModel");

const createReport = asyncHandler(async (req, res) => {
  try {
    const { room_number, dorm, isAdmin, room_type } = req.user;

    if (isAdmin) {
      res.status(400);
      throw new Error("Not authorized");
    }

    const { category, description } = req.body;

    // Check if any required fields are missing
    if (!category || !description || !room_number || !dorm) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    // Check if category is one of the allowed values
    const allowedCategories = [
      "Plumbing",
      "Electrical",
      "Building",
      "AC",
      "Furniture",
    ];
    if (!allowedCategories.includes(category)) {
      res.status(400);
      throw new Error(
        "Invalid category! Allowed categories are: Plumbing, Electrical, Building, AC, Furniture"
      );
    }

    const stat = "Pending";

    // Check if a report with the same category already exists for the given room and dorm
    const existingReport = await ReportModel.findOne({
      category,
      room_number,
      dorm,
    });
    if (existingReport) {
      res.status(400);
      throw new Error(
        "A report with the same category already exists for this room and dorm."
      );
    }

    // Create a new report
    const report = await ReportModel.create({
      category,
      description,
      dorm,
      room_number,
      room_type,
      //status: stat, // corrected typo from "statu" to "status"
    });

    // Send the newly created report as JSON response
    res.status(201).json(report);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

const getStudentReport = asyncHandler(async (req, res) => {
  const { room_number, dorm, isAdmin } = req.user;
  // Check if the user is an admin
  if (isAdmin) {
    res.status(401); // Use 401 for unauthorized access
    throw new Error("Not authorized");
  }

  if (!room_number || !dorm) {
    res.status(404);
    throw new Error("Not a student");
  }
  const capitalizedDorm = dorm.toUpperCase();

  // Find reports where the dorm and room number match those of the authenticated user
  const reports = await ReportModel.find({
    room_number,
    dorm: capitalizedDorm,
  });

  res.status(200).json(reports);
});

const deleteReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isAdmin, room_number, dorm, room_type } = req.user;

  // Check if the user is an admin
  if (isAdmin) {
    res.status(401); // Use 401 for unauthorized access
    throw new Error("Not authorized");
  }

  // Find the report by ID
  const report = await ReportModel.findOne({ _id: id });

  if (room_number !== report.room_number || dorm !== report.dorm) {
    res.status(401); // Use 401 for unauthorized access
    throw new Error("Not authorized");
  }

  // If the report doesn't exist, return an error
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  // Check if the report status is not "Completed"
  if (report.statu !== "Completed") {
    res.status(400);
    throw new Error("You cannot delete an ongoing work report");
  }

  // Create a log entry for the report deletion
  await ReportLogModel.create({
    category: report.category,
    description: report.description,
    room_number: report.room_number,
    dorm: report.dorm,
    date: report.date,
    room_type: report.room_type,
  });

  // Delete the report
  const result = await ReportModel.deleteOne({ _id: id });

  res.status(200).json({ message: "Report deleted successfully", result });
});

const updateReportDescription = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const { isAdmin } = req.user;

  // Check if the user is not an admin
  if (isAdmin) {
    res.status(401); // Unauthorized
    throw new Error("Not authorized");
  }

  // Validate that description is provided
  if (!description) {
    res.status(400);
    throw new Error("Description is required!");
  }

  // Find the report by id
  const report = await ReportModel.findById(id);
  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  // If description field is not empty, add to it, otherwise replace it
  if (report.description) {
    report.description += `\n${description}`; // Add to existing description
  } else {
    report.description = description; // Replace existing description
  }

  // Save the updated report
  await report.save();

  res.status(200).json(report);
});

module.exports = {
  createReport,
  getStudentReport,
  deleteReport,
  updateReportDescription,
};
