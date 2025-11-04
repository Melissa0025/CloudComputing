**Employee Directory**



A full-stack web application to manage employees efficiently — featuring search, filters, sorting, pagination, and data export functionality.

Built with React, Node.js, Express, and MySQL.



**Features**

* View all employees with pagination
* Search by name or email
* Filter by department, designation, or year of joining
* Sort employees dynamically (e.g., by name, date, etc.)
* Add, update, and delete employees
* Export employee data to CSV



**Setup Instructions**

1. Clone the Repository

* https://github.com/Melissa0025/Assignments.git
* cd Set\_1\_Melissa\_Da\_Rocha



2\. Setup the Backend

* cd backend
* npm install



Create a .env file inside the backend/ folder with the following:

PORT=5000

DB\_HOST=localhost

DB\_USER=root

DB\_PASSWORD=yourpassword

DB\_NAME=employee\_directory



* Then run:

       npm start



3\. Setup the Frontend

* cd frontend
* npm install
* npm start



**Database Setup**

1. Open MySQL and create a database:

 

       CREATE DATABASE employee\_directory

       USE employee\_directory



2\. Create the employees table:



CREATE TABLE employees (

  id INT AUTO\_INCREMENT PRIMARY KEY,

  name VARCHAR(100),

  email VARCHAR(100),

  department VARCHAR(100),

  designation VARCHAR(100),

  join\_date DATE

);

