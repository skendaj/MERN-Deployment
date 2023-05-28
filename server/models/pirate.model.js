const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [3, "Name should be more than 3 characteristics"],
      required: [true, "This field is required"],
    },
    imgURL: {
      type: String,
      required: [true, "This field is required"],
    },
    phrase: {
      type: String,
      required: [true, "This field is required"],
    },
    position: {
      type: String,
      required: [true, "This field is required"],
    },
    treasures: {
      type: Number,
      required: [true, "This field is required"],
    },
    pegleg: {
      type: Boolean,
      default: "true",
    },
    eyepatch: {
      type: Boolean,
      default: "true",
    },
    hookhand: {
      type: Boolean,
      default: "true",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Pirate", PirateSchema);
