import express, { Request, Response } from "express";
import pool from "./db";

const app = express();
const PORT = 8080;

// 미들웨어 설정
app.use(express.json());

// 책 목록 조회 API
app.get("/api/books", async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving books");
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`
  ################################################
        🛡️  Server listening on port: ${PORT}🛡️
  ################################################
  `);
});
