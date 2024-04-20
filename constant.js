const errors = {
  VALIDATION_ERROR: 400,
  UNAUTORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

const dorms = ["AA", "BB", "CC", "DD", "EE", "FF"];

const room_numbers = ["101", "102", "103", "104", "105", "106", "107"];

const work_status = ["Pending", "Recived", "Assigned", "Completed"];

const room_types = ["3in1F", "2in1F", "3in1WF", "2in1WF"];

module.exports = {
  errors,
  dorms,
  room_numbers,
  work_status,
  room_types,
};
