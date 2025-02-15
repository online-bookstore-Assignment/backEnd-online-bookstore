import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
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

// CORS 미들웨어를 라우트보다 먼저 적용
const whitelist = ["http://localhost:3000"];

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
  methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
  allowedHeaders: [
    "Access-Control-Allow-Origin",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
};

app.use(cors(corsOptions)); // CORS 미들웨어 추가
app.use(bodyParser.json());

app.use("/api/books", booksRouter); // 책 라우트
