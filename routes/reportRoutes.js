const router = require("express").Router();
const {
  getStudentReport,
  createReport,
  deleteReport,
  updateReportDescription,
} = require("../controller/studentReportController");
const {
  getAllReport,
  getAllStudents,
  getByCategory,
  getByDorm,
  updateReportStatus,
  getLoggedReports,
  getLoggedReportsByCategory,
} = require("../controller/adminReportController");
const validatingToken = require("../middleware/validatingToken");

//student acctions
router.post("/create", validatingToken, createReport);
router.get("/studentReport", validatingToken, getStudentReport);
router.delete("/deleteReport/:id", validatingToken, deleteReport);
router.patch(
  "/reportDescription/:id",
  validatingToken,
  updateReportDescription
);

//admin actions
router.get("/all", validatingToken, getAllReport);
router.get("/category/:category", validatingToken, getByCategory);
router.get("/dorm/:dorm", validatingToken, getByDorm);
router.patch("/editReport/:id", validatingToken, updateReportStatus);
router.get("/getAllStudent", validatingToken, getAllStudents);
router.get("/getLogs", validatingToken, getLoggedReports);
router.get("/getLogCat/:category", validatingToken, getLoggedReportsByCategory);

module.exports = router;
