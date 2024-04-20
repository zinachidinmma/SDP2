const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://seunstar2607:KkyeT5zBDcSDU1qY@sdp.dnobh3e.mongodb.net/SDP?retryWrites=true&w=majority&appName=SDP"
    );
    console.info(`connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
