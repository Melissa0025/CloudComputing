export const exportToCSV = (data) => {
  if (!data || data.length === 0) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Header row
  csvRows.push(headers.join(","));

  // Data rows
  for (const row of data) {
    const values = headers.map((h) => `"${row[h] ?? ""}"`);
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};
