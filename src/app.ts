import express, { Application } from "express";
import path from "path";
// 导入art-template模版引擎
import template from "art-template";

import home from "./controllers/home-controller";
import article from "./controllers/article-controller";
import user from "./controllers/user-controller";
import login from "./controllers/login-controller";

const app: Application = express();
app.use(express.static(path.join(__dirname, "public")));
// 设置模版位置
app.set("views", path.join(__dirname, "views"));
// 配置模版默认后缀
app.set("view engine", "art");
// 当渲染后缀为art的模版时，指定所使用的模版引擎是什么
app.engine("art", require("express-art-template"));

app.use("/", home);
app.use("/article", article);
app.use("/user", user);
app.use("/login", login);

app.listen(8080, () => {
  console.log("网站服务器启动成功，端口：8080，请访问：http://localhost:8080");
});
