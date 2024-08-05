const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    rollNum: {
      type: Number,
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Students", studentSchema);

module.exports = { Student };
