import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정 (JSON 파싱)
app.use(express.json());

// 기본 라우트
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express Server!");
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
