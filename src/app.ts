import express, { Application } from "express";
// 导入express-session模块
import session from "express-session";
// 引入body-parser模块 用来处理post请求参数
import bodyPaser from "body-parser";
import path from "path";
// 导入art-tempate模板引擎
import template from "art-template";
import moment from "moment";
// 向模板内部导入moment变量
template.defaults.imports.moment = moment;
// 数据库连接
import { openConnectDb } from "./models/conn";
openConnectDb();

const app: Application = express();
// 配置session
app.use(
  session({
    secret: "cms-admin-2026",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, //1天
    },
  }),
);
// 处理post请求参数
app.use(bodyPaser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//设置模板位置
app.set("views", path.join(__dirname, "views"));
//配置模板默认后缀
app.set("view engine", "art");
// 当渲染后缀为art的模板时，指定所使用的模板引擎是什么
app.engine("art", require("express-art-template"));

//--------------这些用routes替代------------------
// import home from './controllers/home-controller';
// import article from './controllers/article-controller';
// import user from './controllers/user-controller';
// import login from './controllers/login-controller';
// app.use('/', home);
// app.use('/article', article);
// app.use('/user', user);
// app.use('/login', login);

import { filter } from "./filters/index";
// 全局过滤器
app.use("/admin", filter);
// 添加路由
import routes from "./routes";
routes(app);

app.listen(8080, () => {
  console.log("网站服务器启动成功，请访问：http://localhost:8080");
});
