const { Student } = require("../models/student");

const handleGetStudents = async (req, res) => {
  const { page = 1, limit = 10, sort = "asc", search } = req.query;
  const sortOrder = sort === "desc" ? -1 : 1;
  const searchRegExp = search ? new RegExp(search, "i") : null;
  const filter = {};

  if (search) {
    const searchAsNumber = Number(search);
    if (!isNaN(searchAsNumber)) {
      filter.rollNum = searchAsNumber;
    } else if (searchRegExp) {
      filter.$or = [{ firstName: searchRegExp }, { subjectName: searchRegExp }];
    }
  }

  try {
    const students = await Student.aggregate([
      { $match: filter },
      { $sort: { rollNum: sortOrder } },
      { $skip: (page - 1) * limit },
      { $limit: parseInt(limit) },
      { $project: { numberOfSubjects: 0 } },
    ]);

    const totalStudents = await Student.countDocuments(filter);

    res.status(200).json({
      students,
      totalPages: Math.ceil(totalStudents / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleGetStudentById = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ msg: "ID is required!" });

  try {
    const student = await Student.findById(id);
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleCreateNewStudent = async (req, res) => {
  const { firstName, lastName, rollNum, subjectName, marks } = req.body;

  try {
    let student = await Student.findOne({
      rollNum,
      subjectName: new RegExp(`^${subjectName}$`, "i"),
    });

    if (student) {
      await Student.findByIdAndUpdate(student._id, { marks });
      return res
        .status(200)
        .json({ msg: "Student marks updated successfully" });
    }

    student = new Student({ firstName, lastName, rollNum, subjectName, marks });
    await student.save();

    res.status(201).json({ msg: "Student created successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleEditStudent = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ msg: "Student ID is required" });

  const { firstName, lastName, rollNum, subjectName, marks } = req.body;

  try {
    const student = await Student.findById(id);

    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (rollNum) student.rollNum = rollNum;
    if (subjectName) student.subjectName = subjectName;
    if (marks) student.marks = marks;

    await student.save();
    return res.status(200).json({ msg: "Student updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const handleDeleteEntry = async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(400).json({ msg: "Student ID is required" });

  try {
    await Student.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  handleGetStudents,
  handleGetStudentById,
  handleCreateNewStudent,
  handleEditStudent,
  handleDeleteEntry,
};
