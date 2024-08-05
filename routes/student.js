const express = require("express");
const {
  handleCreateNewStudent,
  handleEditStudent,
  handleGetStudents,
  handleGetStudentById,
  handleDeleteEntry,
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
  .delete(isAuthenticated, handleDeleteEntry);

module.exports = router;
