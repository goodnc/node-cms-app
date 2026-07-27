// process.env.NODE_CONFIG_DIR = "./config";
import express, { Application } from "express";
import path from "path";
// 导入art-template模版引擎
import template from "art-template";
// 向模版内部导入moment变量，方便在模版中使用moment对象
import moment from "moment";
template.defaults.imports.moment = moment;
import bodyParser from "body-parser";
import session from "express-session";

// ------这里用routes替代------
// import home from "./controllers/home-controller";
// import article from "./controllers/article-controller";
// import user from "./controllers/user-controller";
// import login from "./controllers/login-controller";
// app.use("/", home);
// app.use("/article", article);
// app.use("/user", user);
// app.use("/login", login);

import "./models/conn";

const app: Application = express();
app.use(express.static(path.join(__dirname, "public")));
// 设置模版位置
app.set("views", path.join(__dirname, "views"));
// 配置模版默认后缀
app.set("view engine", "art");
// 当渲染后缀为art的模版时，指定所使用的模版引擎是什么
app.engine("art", require("express-art-template"));

// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: true }));
// 新增session配置
app.use(
  session({
    secret: "cms-admin-2026", // 自定义密钥
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

import loginCtrl from "./controllers/login-controller";
// 3. 执行函数，挂载所有登录相关路由（关键！少这行直接404 POST）
loginCtrl.registerRoutes(app);

app.listen(8080, () => {
  console.log("网站服务器启动成功，请访问：http://localhost:8080");
});
