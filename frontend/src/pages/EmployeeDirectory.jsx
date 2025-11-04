import React, { useEffect, useState } from "react";
import { FaPlus, FaTable, FaThLarge } from "react-icons/fa";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";
import SearchBar from "../components/SearchBar";
import ExportButton from "../components/ExportButton";
import Pagination from "../components/Pagination";
import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employeeAPI";
import "../styles/employeeDirectory.css";

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [view, setView] = useState("table");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    designation: "",
    year: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Items per page based on view
  const itemsPerPage = view === "table" ? 10 : 12;

  // Load employees on mount and when filters/page changes
  useEffect(() => {
    loadEmployees(currentPage, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters, view]);

  // Fetch employees with pagination and filters
  const loadEmployees = async (page = 1, activeFilters = {}) => {
    try {
      const limit = itemsPerPage;
      const offset = (page - 1) * limit;

      const params = {
        ...activeFilters,
        limit,
        offset,
      };

      const data = await getEmployees(params);

      if (data && Array.isArray(data.data)) {
        setEmployees(data.data);
        setFilteredEmployees(data.data);
        setTotalItems(data.total || data.data.length);
        console.log(`Loaded ${data.data.length} employees (total: ${data.total})`);
      } else {
        console.error("Invalid employee response:", data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Handle search/filter changes
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Add / Edit submit
  const handleFormSubmit = async (formData) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formData);
        //alert("Employee updated successfully!");
      } else {
        await addEmployee(formData);
        //alert("Employee added successfully!");
      }
      setShowForm(false);
      setEditingEmployee(null);
      await loadEmployees(currentPage, filters);
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  // Edit
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(id);
        //alert("Employee deleted successfully!");
        await loadEmployees(currentPage, filters);
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Keep page in valid range
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [totalPages, currentPage]);

  // Reset page when view changes
  useEffect(() => {
    setCurrentPage(1);
  }, [view]);

  console.log({
    totalItems,
    itemsPerPage,
    totalPages,
    currentPage,
  });

  return (
    <div className="employee-directory">
      <h1>EMPLOYEE DIRECTORY</h1>

      {/* Top bar */}
      <div className="top-bar">
        <SearchBar onFilterChange={handleFilter} />

        <div className="top-actions">
          <button
            className="add-btn"
            onClick={() => {
              setShowForm(true);
              setEditingEmployee(null);
            }}
          >
            <FaPlus /> Add New Employee
          </button>

          <ExportButton filters={filters} />


          <div className="view-toggle">
            <button
              className={view === "table" ? "active" : ""}
              onClick={() => setView("table")}
              title="Table View"
            >
              <FaTable />
            </button>
            <button
              className={view === "card" ? "active" : ""}
              onClick={() => setView("card")}
              title="Card View"
            >
              <FaThLarge />
            </button>
          </div>
        </div>
      </div>

      {/* Display */}
      {view === "table" ? (
        <EmployeeTable
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <EmployeeCard
          employees={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Employee Form */}
      {showForm && (
        <EmployeeForm
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
          employeeData={editingEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeDirectory;
