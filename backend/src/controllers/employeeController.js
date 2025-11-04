import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../models/employeeModel.js";
import { exportToCSV } from "../utils/csvExport.js";

export const getEmployees = (req, res) => {
  const filters = {
    search: req.query.search || "",
    department: req.query.department || "",
    designation: req.query.designation || "",
    year: req.query.year || "",
    sort: req.query.sort || "id",
    order: req.query.order || "asc",
    limit: parseInt(req.query.limit) || 10,
    offset: parseInt(req.query.offset) || 0,
  };

  getAllEmployees(filters, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Database error", error: err });
    res.status(200).json(results);
  });
};


export const addEmployeeController = (req, res) => {
  addEmployee(req.body, (err, result) => {
    if (err) return res.status(500).json({ message: "Error adding employee", error: err });
    res.status(201).json({ message: "Employee added successfully", id: result.insertId });
  });
};

export const updateEmployeeController = (req, res) => {
  updateEmployee(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: "Error updating employee", error: err });
    res.status(200).json({ message: "Employee updated successfully" });
  });
};

export const deleteEmployeeController = (req, res) => {
  deleteEmployee(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Error deleting employee", error: err });
    res.status(200).json({ message: "Employee deleted successfully" });
  });
};

export const exportEmployees = (req, res) => {
  const filters = {
    search: req.query.search || "",
    department: req.query.department || "",
    designation: req.query.designation || "",
    year: req.query.year || "",
  };

  getAllEmployees(filters, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching employees for CSV", error: err });

    const csv = exportToCSV(results);
    res.setHeader("Content-Disposition", "attachment; filename=employees.csv");
    res.setHeader("Content-Type", "text/csv");
    res.status(200).end(csv);
  });
};
