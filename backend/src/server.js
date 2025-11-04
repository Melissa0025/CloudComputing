import dotenv from "dotenv";
import app from "./app.js";
import "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// For Azure, use 0.0.0.0 instead of localhost
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
