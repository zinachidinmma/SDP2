// validateRoomCombination.js

const validateRoomCombination = (room_number, room_type) => {
  const isValidCombination =
    (["3in1WF", "3in1F"].includes(room_type) &&
      room_number >= "101" &&
      room_number <= "105") ||
    (["2in1WF", "2in1F"].includes(room_type) &&
      room_number >= 106 &&
      room_number <= 107);

  return isValidCombination;
};

module.exports = validateRoomCombination;
