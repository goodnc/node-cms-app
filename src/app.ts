import express, { Application } from "express";

import home from "./controllers/home-controller";
import article from "./controllers/article-controller";
import user from "./controllers/user-controller";
import login from "./controllers/login-controller";

const app: Application = express();

app.use("/", home);
app.use("/article", article);
app.use("/user", user);
app.use("/login", login);

app.listen(8080, () => {
  console.log("网站服务器启动成功，端口：8080，请访问：http://localhost:8080");
});
