const { ReportModel } = require("../models/reportModel");
const { categories, work_status } = require("../constant");
// Middleware to handle asynchronous routes
const asyncHandler = require("express-async-handler");

const getTotalReports = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    res.status(401);
    throw new Error(`Not Allowed ${isAdmin}`);
  }

  const total = await ReportModel.countDocuments({});

  res.status(200).json({ Total: total });
});

const getTotalCategoriesReports = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;
  const { category } = req.params;

  if (!isAdmin) {
    res.status(401);
    throw new Error(`Not Allowed ${isAdmin}`);
  }

  if (!categories.includes(category)) {
    res.status(400);
    throw new Error(`Category '${category}' is not valid.`);
  }

  const total = await ReportModel.countDocuments({ category });

  res.status(200).json({ Category: category, Total: total });
});

const getTotalStatusReports = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;
  const { status } = req.params;

  if (!isAdmin) {
    res.status(401);
    throw new Error(`Not Allowed ${isAdmin}`);
  }

  if (!work_status.includes(status)) {
    res.status(400);
    throw new Error(`Category '${status}' is not valid.`);
  }

  const total = await ReportModel.countDocuments({ statu: status });

  res.status(200).json({ Category: status, Total: total });
});

module.exports = {
  getTotalReports,
  getTotalCategoriesReports,
  getTotalStatusReports,
};
