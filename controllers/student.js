const { Student } = require("../models/student");
const { mergeArrays } = require("../utils/helperFunctions");

const handleGetStudents = async (req, res) => {
  const students = await Student.find({});
  res.status(200).json(students);
};

const handleGetStudentById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ msg: "ID is required!" });
  }
  const student = await Student.findById(id);
  res.status(200).json(student);
};

const handleCreateNewStudent = async (req, res) => {
  const { firstName, lastName, rollNum, subjects } = req.body;

  let student = await Student.findOne({ rollNum });

  if (student) {
    // mergeArrays - a helper func to add remaining subjects in the new subject array
    const newSubjectArr = mergeArrays(student.subjects, subjects);
    await Student.findOneAndUpdate(
      { rollNum },
      { subjects: [...newSubjectArr] }
    );
    return res.status(200).json({ msg: "Student marks updated successfully" });
  }

  student = new Student({ firstName, lastName, rollNum, subjects });
  await student.save();

  res.status(201).json({ msg: "Student created successfully!" });
};

const handleEditStudent = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ msg: "Student ID is required" });

  const { firstName, lastName, rollNum, subjects } = req.body;

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

  if (subjects?.length > 0) {
    // mergeArrays - a helper func to add remaining subjects in the new subject array
    student.subjects = mergeArrays(student.subjects, subjects);
  }

  await Student.findByIdAndUpdate(id, student);
  return res.status(200).json({ msg: "Student updated successfully" });
};

const handleDeleteStudent = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ msg: "Student ID is required" });

  await Student.findByIdAndDelete(id);
  return res.status(200).json({ msg: "Student deleted successfully" });
};

const handleDeleteSubject = async (req, res) => {
  const id = req.params.id;
  const { subjectID } = req.body;

  if (!id || !subjectID)
    return res.status(400).json({ msg: "Student & Subject ID is required" });

  await Student.updateOne(
    { _id: id },
    { $pull: { subjects: { _id: subjectID } } }
  );

  return res.status(200).json({ msg: "Subject deleted successfully" });
};

module.exports = {
  handleGetStudents,
  handleGetStudentById,
  handleCreateNewStudent,
  handleEditStudent,
  handleDeleteStudent,
  handleDeleteSubject,
};
