import express, { Request, Response, Router } from "express";
const home: Router = express.Router();
home.get("/", (req: Request, res: Response) => {
  // 设置response编码为utf-8
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  res.end("首页内容");
  // 上面两行代码等价于：
  // res.setHeader("Content-Type", "text/html;charset=utf-8");
});

export default home;
