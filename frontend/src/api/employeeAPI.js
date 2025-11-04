import axios from "axios";

//const API_BASE_URL = "http://localhost:5000/api/employees";

const API_URL = "https://employee-directory-backend.azurewebsites.net/api";


// Get all employees with filters, search, pagination, and sorting
export const getEmployees = async (params) => {
  try {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// Get a single employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};

// Add a new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(API_BASE_URL, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

// Update an existing employee
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Delete an employee
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

// Export filtered employees to CSV
export const exportEmployeesToCSV = async (params) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/export`, {
      params,
      responseType: "blob",
    });

    // Create a downloadable link for CSV file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "employees.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error exporting employees:", error);
    throw error;
  }
};
