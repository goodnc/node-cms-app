import express, { Application, Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import config from "config";
import modelUser, { type IUser } from "../models/user";
const { User, validateUser } = modelUser;
// import { IUser, User, validateUser } from "../models/user";
declare module "express-session" {
  interface SessionData {
    userInfo: IUser;
  }
}
//注册路由
const registerRoutes = (app: Application) => {
  app.get("/login", loginPage);
  app.post("/login", login);
  app.get("/register", registerPage);
  app.post("/register", register);
  app.get("/logout", logout);
};
// 登录-get
const loginPage = (req: Request, res: Response) => {
  res.app.locals.title = config.get("title");
  res.render("login");
};
// 登录-post
const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("object:>>", username, password);
  const msg = "用户名或密码错误";
  if (username.trim().length === 0 || password.trim().length === 0) {
    return res.status(400).render("admin/error", { msg });
  }
  // 根据用户名查找用户信息
  let user = await User.findOne({ username });
  // 查询到了用户
  if (user) {
    // 比较密码是否正确
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // 密码正确，设置session
      req.session.userInfo = user;
      req.app.locals.userInfo = user;
      if (user.role === "admin") {
        res.redirect("/admin/user");
      } else {
        res.redirect("/");
      }
      //   res.redirect("/");
    }
  } else {
    // 没有查询到用户
    return res.status(400).render("admin/error", { msg });
  }
};

// 注册-get
const registerPage = (req: Request, res: Response) => {
  const { message } = req.query;
  res.render("register", { message });
};
// 注册-post
const register = async (req: Request, res: Response) => {
  try {
    await validateUser(req.body);
  } catch (e) {
    return res.redirect(`/register?message=${e.message}`);
  }
  let user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (user) {
    return res.redirect(`/register`);
  }
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  // 替换密码
  req.body.password = password;
  // 将用户信息添加到数据库中
  await User.create(req.body);
  // 将页面重定向到首页
  res.redirect("/");
};

// 登出
const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/login");
    // 清除模版中的用户信息
    req.app.locals.userInfo = null;
  });
};

export default {
  registerRoutes,
  loginPage,
  login,
  registerPage,
  register,
  logout,
};
