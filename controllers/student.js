const { Student } = require("../models/student");
const { mergeArrays } = require("../utils/helperFunctions");

const handleCreateNewStudent = async (req, res) => {
  const { firstName, lastName, rollNum, subject } = req.body;

  if (!rollNum)
    return res.status(400).json({ msg: "Roll Number can't be empty! " });
  if (!firstName)
    return res.status(400).json({ msg: "First Name can't be empty! " });
  if (!subject?.length > 0)
    return res.status(400).json({ msg: "Subjects can't be empty! " });

  let student = await Student.findOne({ rollNum });

  if (student) {
    // mergeArrays - a helper func to add remaining subjects in the new subject array
    const newSubjectArr = mergeArrays(student.subject, subject);
    await Student.findOneAndUpdate(
      { rollNum },
      { subject: [...newSubjectArr] }
    );
    return res.status(200).json({ msg: "Student marks updated successfully" });
  }

  student = new Student({ firstName, lastName, rollNum, subject });
  await student.save();

  res.status(201).json({ msg: "Student created successfully!" });
};

const handleEditStudent = async (req, res) => {
  const { firstName, lastName, rollNum, subject, id } = req.body;

  const student = await Student.findById(id);

  if (firstName) student.firstName = firstName;
  if (lastName) student.lastName = lastName;

  if (rollNum) {
    const existingStudent = await Student.findOne({ rollNum });
    if (existingStudent && existingStudent._id.toString() !== id) {
      return res.status(400).json({ msg: "Roll number already exists" });
    }
    student.rollNum = rollNum;
  }

  if (subject?.length > 0) {
    // mergeArrays - a helper func to add remaining subjects in the new subject array
    student.subject = mergeArrays(student.subject, subject);
  }

  await Student.findByIdAndUpdate(id, student);
  return res.status(200).json({ msg: "Student updated successfully" });
};

const handleDeleteStudent = async (req, res) => {
  const { id } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ msg: "Must provide the student id to delete!" });

  await Student.findByIdAndDelete(id);
  return res.status(200).json({ msg: "Student deleted successfully" });
};

const handleDeleteSubject = async (req, res) => {
  const { id, subjectID } = req.body;

  if (!id || !subjectID)
    return res.status(400).json({ msg: "Must provide id to delete!" });

  await Student.updateOne(
    { _id: id },
    { $pull: { subject: { _id: subjectID } } }
  );

  return res.status(200).json({ msg: "Subject deleted successfully" });
};

module.exports = {
  handleCreateNewStudent,
  handleEditStudent,
  handleDeleteStudent,
  handleDeleteSubject,
};
