// calculateMaxOccupancy.js

const calculateMaxOccupancy = (room_number) => {
  let maxOccupants;
  if (room_number >= 101 && room_number <= 105) {
    maxOccupants = 3;
  } else if (room_number >= 106 && room_number <= 107) {
    maxOccupants = 2;
  }
  return maxOccupants;
};

module.exports = calculateMaxOccupancy;
