import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import indexRouter from "./route";
import booksRouter from "./route/books";

const app = express();
const PORT = 8080;

// 서버 시작
app.listen(PORT, () => {
  console.log(`
  ################################################
        🛡️  Server listening on port: ${PORT}🛡️
  ################################################
  `);
});

app.use(
  cors({
    origin:
      "https://front-end-online-bookstore-git-main-spde3289s-projects.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

app.use("/", indexRouter); // 책 라우트
app.use("/api/books", booksRouter); // 책 라우트
