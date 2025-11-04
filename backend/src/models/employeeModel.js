import db from "../config/db.js";

// Get employees with filters, search, sorting, and pagination
export const getAllEmployees = (filters, callback) => {
  const {
    search,
    department,
    designation,
    year,
    sort,
    order,
    limit,
    offset,
  } = filters;

  let baseQuery = "FROM employees WHERE 1=1";
  const params = [];

  if (search) {
    baseQuery += " AND (name LIKE ? OR email LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  if (department) {
    baseQuery += " AND department = ?";
    params.push(department);
  }

  if (designation) {
    baseQuery += " AND designation = ?";
    params.push(designation);
  }

  if (year) {
    baseQuery += " AND YEAR(join_date) = ?";
    params.push(year);
  }

  const sortColumn = sort || "id";
  const sortOrder = order === "desc" ? "DESC" : "ASC";

  // Base query for data
  let dataQuery = `SELECT * ${baseQuery} ORDER BY ${sortColumn} ${sortOrder}`;
  const dataParams = [...params];

  // Add pagination only if limit and offset are numbers
  if (Number.isFinite(Number(limit)) && Number.isFinite(Number(offset))) {
    dataQuery += " LIMIT ? OFFSET ?";
    dataParams.push(Number(limit), Number(offset));
  }

  const countQuery = `SELECT COUNT(*) AS total ${baseQuery}`;

  db.query(countQuery, params, (err, countResult) => {
    if (err) return callback(err);

    const total = countResult[0].total;

    db.query(dataQuery, dataParams, (err, dataResult) => {
      if (err) return callback(err);

      // For export, just return raw array (no total)
      if (!limit && !offset) {
        return callback(null, dataResult);
      }

      // For paginated fetch
      callback(null, { total, data: dataResult });
    });
  });
};

// Add new employee
export const addEmployee = (employee, callback) => {
  const { name, email, department, designation, join_date } = employee;
  const query =
    "INSERT INTO employees (name, email, department, designation, join_date) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, email, department, designation, join_date], callback);
};

// Update employee
export const updateEmployee = (id, employee, callback) => {
  const { name, email, department, designation, join_date } = employee;
  const query =
    "UPDATE employees SET name=?, email=?, department=?, designation=?, join_date=? WHERE id=?";
  db.query(query, [name, email, department, designation, join_date, id], callback);
};

// Delete employee
export const deleteEmployee = (id, callback) => {
  const query = "DELETE FROM employees WHERE id=?";
  db.query(query, [id], callback);
};
