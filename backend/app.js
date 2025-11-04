import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import employeeRoutes from "./src/routes/employeeRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/employees", employeeRoutes);

export default app;
