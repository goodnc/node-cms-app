import express, { Application } from "express";

const app: Application = express();

app.listen(8080, () => {
  console.log("网站服务器启动成功，端口：8080，请访问：http://localhost:8080");
});
