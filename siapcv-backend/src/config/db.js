import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cv_builder",
  connectionLimit: 10,
});

export default pool;
