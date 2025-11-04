import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt, FaUserSlash } from 'react-icons/fa';
import '../styles/employeeDirectory.css';

const EmployeeCard = ({ employees = [], onEdit, onDelete }) => {
  return (
    <div className="card-grid">
      {employees.length === 0 ? (
        <p className="no-data">
          <FaUserSlash className="no-data-icon" /> No employees found.
        </p>
      ) : (
        employees.map((emp) => (
          <div key={emp.id} className="employee-card">
            <div className="card-header">
              <h3>{emp.name}</h3>
              <p className="emp-email">{emp.email}</p>
            </div>

            <div className="card-body">
              <p><strong>Department:</strong> {emp.department}</p>
              <p><strong>Designation:</strong> {emp.designation}</p>
              <p><strong>Join Date:</strong> {emp.join_date}</p>
            </div>

            <div className="card-actions">
              <button
                className="edit-btn"
                onClick={() => onEdit && onEdit(emp)}
                title="Edit Employee"
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => onDelete && onDelete(emp.id)}
                title="Delete Employee"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

//Prop validation for better reliability
EmployeeCard.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      department: PropTypes.string,
      designation: PropTypes.string,
      join_date: PropTypes.string,
    })
  ),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default EmployeeCard;
