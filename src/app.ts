import express from "express";
import booksRouter from "./route/books";

const app = express();
const PORT = 8080;

// 미들웨어 설정
app.use(express.json());
app.use("/api/books", booksRouter); // 책 라우트

// 서버 시작
app.listen(PORT, () => {
  console.log(`
  ################################################
        🛡️  Server listening on port: ${PORT}🛡️
  ################################################
  `);
});
