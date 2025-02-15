import "dotenv/config";
import express from "express";
import {
  deleteHandler,
  getDetailHandler,
  getListHandler,
  postAddHandler,
  putAddHandler,
} from "./handler";

let booksRouter = express.Router();

// 책 목록 조회 API
booksRouter.get("/", getListHandler);

// 책 상세 정보 조회 API
booksRouter.get("/:id", getDetailHandler);

// 책 추가 API
booksRouter.post("/", postAddHandler);

// 책 정보 수정 API
booksRouter.put("/:id", putAddHandler);

// 책 삭제 API
booksRouter.delete("/:id", deleteHandler);

export default booksRouter;
