import express, { Request, Response, Router } from "express";
const admin: Router = express.Router();
admin.get("/", (req: Request, res: Response) => {
  // 设置response编码为utf-8
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end("欢迎进入网站后台管理页");
});

export default admin;
