import express, { Request, Response, Router } from "express";
const login: Router = express.Router();
login.get("/", (req: Request, res: Response) => {
  // 设置response编码为utf-8
  //   res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  //   res.end("欢迎进入登录注册页");
  res.render("login");
});

export default login;
