import express from "express";
import {
  getEmployees,
  addEmployeeController,
  updateEmployeeController,
  deleteEmployeeController,
  exportEmployees,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployees);
router.post("/", addEmployeeController);
router.put("/:id", updateEmployeeController);
router.delete("/:id", deleteEmployeeController);
router.get("/export", exportEmployees);

export default router;
