import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();
const databaseName = process.env.DB_NAME || "postgres";
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: databaseName,
  password: process.env.DB_PASSWORD || "postgres",
  port: parseInt(process.env.DB_PORT || "5432"),
});

async function applySchema() {
  try {
    // Check if the "products" table exists
    const res = await pool.query(
      "SELECT 1 FROM information_schema.tables WHERE table_name = 'todos_interview_mini_project'"
    );

    if (res.rowCount === 0) {
      // Apply schema if table doesn't exist
      const schemaPath = path.join(__dirname, "schema.sql");
      const schema = fs.readFileSync(schemaPath, "utf-8");
      await pool.query(schema);
      console.log("Database schema applied successfully.");
      console.log("Table 'todos_interview_mini_project' created.");
    } else {
      console.log("Schema already exists, skipping creation.");
    }
  } catch (error) {
    console.error("Error applying schema:", error);
  }
}
applySchema();

export default pool;
