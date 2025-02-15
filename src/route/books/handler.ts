import "dotenv/config";
import { Request } from "express";
import pool from "../../db";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

interface Message {
  message: string;
}

interface JSONResponse<T> {
  status: (code: number) => JSONResponse<T>;
  json: (data: T) => void;
}

interface Handler<T> {
  (req: Request, res: JSONResponse<T>, next: () => void): void;
}

// 책 목록 조회 Handler
export const getListHandler: Handler<Book[] | Message> = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");

    res.json(rows as Book[]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 책 상세 정보 조회 Handler
export const getDetailHandler: Handler<Book | Message> = async (
  req: Request,
  res
) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);

    if (Array.isArray(rows) && rows.length > 0) {
      res.json(rows[0] as Book);
    } else {
      res.status(404).json({ message: "책을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 책 추가 Handler
export const postAddHandler: Handler<Book | Message> = async (req, res) => {
  const { title, author, price } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
      [title, author, price]
    );

    if (title && author && price) {
      res.status(400).json({ message: "값이 누락되었습니다." });
    }

    res.status(201).json({ message: `${title} 책 추가 완료` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 책 정보 수정 Handler
export const putAddHandler: Handler<Book | Message> = async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;
  try {
    const result = await pool.query(
      "UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?",
      [title, author, price, id]
    );

    if ((result as any).affectedRows === 0) {
      res.status(404).json({ message: "책을 찾을 수 없습니다." });
    }
    res.json({ message: "책 정보 수정 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};

// 책 삭제 Handler
export const deleteHandler: Handler<Book | Message> = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM books WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      res.status(404).json({ message: "책을 찾을 수 없습니다." });
    }
    res.json({ message: "책 삭제 완료" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
};
