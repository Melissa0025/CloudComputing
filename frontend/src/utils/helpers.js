export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

//Sort employees by name, department, or join date
export const sortEmployees = (employees, key, order = "asc") => {
  return [...employees].sort((a, b) => {
    let valA = a[key]?.toString().toLowerCase();
    let valB = b[key]?.toString().toLowerCase();

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });
};

//Filter employees based on search term
export const filterEmployees = (employees, term) => {
  if (!term) return employees;
  return employees.filter(
    (emp) =>
      emp.name?.toLowerCase().includes(term.toLowerCase()) ||
      emp.department?.toLowerCase().includes(term.toLowerCase()) ||
      emp.designation?.toLowerCase().includes(term.toLowerCase())
  );
};
