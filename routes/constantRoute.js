const router = require("express").Router();
const permittedConstants = require("../controller/constantController");

router.get("/room_numbers", (req, res) => {
  res.json({
    message: "Permitted room numbers:",
    data: permittedConstants.room_numbers,
  });
});

router.get("/room_types", (req, res) => {
  res.json({
    message: "Permitted room types:",
    data: permittedConstants.room_types,
  });
});

router.get("/work_status", (req, res) => {
  res.json({
    message: "Permitted work statuses:",
    data: permittedConstants.work_status,
  });
});

router.get("/dorms", (req, res) => {
  res.json({
    message: "Permitted dorms:",
    data: permittedConstants.dorms,
  });
});

module.exports = router;
