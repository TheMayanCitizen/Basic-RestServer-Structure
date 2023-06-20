const mongoose = require("mongoose");

const dbConnetion = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);

    console.log("DB online");
  } catch (error) {
    throw new Error("Error when initializing DB");
  }
};

module.exports = {
  dbConnetion,
};
