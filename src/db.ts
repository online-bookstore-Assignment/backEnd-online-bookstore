import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000, // 20초 타임아웃 설정
});

// MySQL 연결 테스트
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL Database connected successfully");
    connection.release(); // 연결 해제
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

testConnection(); // 서버 시작 시 연결 테스트

export default pool;
