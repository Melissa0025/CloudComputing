import React, { useState, useEffect } from "react";
import "../styles/employeeDirectory.css";

const EmployeeForm = ({ onSubmit, onClose, employeeData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    join_date: "",
  });

  //Populate form when editing an employee
  useEffect(() => {
    if (employeeData) {
      setFormData({
        name: employeeData.name || "",
        email: employeeData.email || "",
        department: employeeData.department || "",
        designation: employeeData.designation || "",
        join_date: employeeData.join_date
          ? employeeData.join_date.slice(0, 10)
          : "",
      });
    } else {
      // Reset form when adding new employee
      setFormData({
        name: "",
        email: "",
        department: "",
        designation: "",
        join_date: "",
      });
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    
    if (!employeeData) {
      setFormData({
        name: "",
        email: "",
        department: "",
        designation: "",
        join_date: "",
      });
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <h2>{employeeData ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">HR</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Designation</label>
            <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            >
              <option value="">Select Designation</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Marketing Specialist">Marketing Specialist</option>
              <option value="Sales Representative">Sales Representative</option>
              <option value="Project Lead">Project Lead</option>
            </select>
          </div>


          <div className="form-group">
            <label>Join Date</label>
            <input
              type="date"
              name="join_date"
              value={formData.join_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-btn">
              {employeeData ? "Update" : "Save"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
