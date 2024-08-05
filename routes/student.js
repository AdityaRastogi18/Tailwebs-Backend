const express = require("express");
const {
  handleCreateNewStudent,
  handleEditStudent,
  handleDeleteStudent,
  handleDeleteSubject,
  handleGetStudents,
  handleGetStudentById,
} = require("../controllers/student");
const isAuthenticated = require("../middlewares/authMiddleware");
const { studentValidator } = require("../validators");

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, handleGetStudents)
  .post(
    isAuthenticated,
    studentValidator.validateStudent,
    handleCreateNewStudent
  );

router
  .route("/:id")
  .get(isAuthenticated, handleGetStudentById)
  .patch(isAuthenticated, handleEditStudent)
  .delete(isAuthenticated, handleDeleteStudent);

router.delete("/subject", isAuthenticated, handleDeleteSubject);

module.exports = router;
