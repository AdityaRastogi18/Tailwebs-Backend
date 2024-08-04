const express = require("express");
const {
  handleCreateNewStudent,
  handleEditStudent,
  handleDeleteStudent,
  handleDeleteSubject,
} = require("../controllers/student");

const router = express.Router();

router
  .route("/")
  .post(handleCreateNewStudent)
  .patch(handleEditStudent)
  .delete(handleDeleteStudent);

router.delete("/subject", handleDeleteSubject);

module.exports = router;
