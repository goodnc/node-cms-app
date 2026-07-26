import express, { Request, Response, Router } from "express";
const article: Router = express.Router();
article.get("/", (req: Request, res: Response) => {
  // 设置response编码为utf-8
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end("欢迎进入文章管理页面");
});

export default article;
