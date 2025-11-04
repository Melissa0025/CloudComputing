import React, { useState } from 'react';
import '../styles/employeeDirectory.css';

const SearchBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    department: '',
    designation: '',
    year: ''
  });

  // handle input/filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = { search: '', department: '', designation: '', year: '' };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        name="search"
        placeholder="Search employees..."
        value={filters.search}
        onChange={handleChange}
      />

      <select name="department" value={filters.department} onChange={handleChange}>
        <option value="">All Departments</option>
        <option value="Engineering">Engineering</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="HR">HR</option>
      </select>

      <select name="designation" value={filters.designation} onChange={handleChange}>
        <option value="">All Designations</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Marketing Specialist">Marketing Specialist</option>
        <option value="Sales Representative">Sales Representative</option>
        <option value="Project Lead">Project Lead</option>
      </select>

      <input
        type="text"
        name="year"
        placeholder="Year (e.g., 2023)"
        value={filters.year}
        onChange={handleChange}
        style={{ width: '110px' }}
      />

      <button className="reset-btn" onClick={handleReset}>Reset Filters</button>
    </div>
  );
};

export default SearchBar;
