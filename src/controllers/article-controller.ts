import express, { Application, Request, Response, Router } from "express";
// const article: Router = express.Router();
// article.get("/", (req: Request, res: Response) => {
//   // 设置response编码为utf-8
//   res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//   res.end("欢迎进入文章管理页面");
// });

// export default article;
// export default {
//   registerRoutes: (app: Application) => {},
// };

// 将文章集合的构造函数导入到当前文件中
import { Article } from "../models/article";
// 引入formidable第三方模块
import formidable from "formidable";
import path from "path";
// 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

//获取表单对象
export const getFormObj = (fields: any) => {
  const post: any = {};
  for (let field in fields) {
    post[field] =
      Array.isArray(fields[field]) && fields[field].length > 0
        ? fields[field][0]
        : fields[field];
  }
  return post;
};

const registerRoutes = (app: Application) => {
  app.get("/admin/article", articlePage);
  app.get("/admin/article/edit-view", editView);
  app.post("/admin/article/add", add);
  app.post("/admin/article/edit", edit);
  app.get("/admin/article/remove", remove);
  app.post("/admin/article/browerServer", uploadImg);
};
const articlePage = async (req: Request, res: Response) => {
  // 标识当前访问的是文章管理页面
  req.app.locals.currentLink = "article";
  // 接收客户端传递过来的页码
  let { title, page } = req.query;
  //条件查询
  let searchObj: any = {};
  if (title) {
    searchObj.title = title;
  }
  // 查询所有文章数据
  let articles = await pagination(Article)
    .find(searchObj)
    .page(page) // page 指定当前页
    .size(2) // size 指定每页显示的数据条数
    .display(3) // display 指定客户端要显示的页码数量
    .populate("author")
    .exec(); // exec 向数据库中发送查询请求
  // 渲染文章列表页面模板
  res.render("admin/article", {
    articles: JSON.parse(JSON.stringify(articles)),
  });
};

const editView = async (req: Request, res: Response) => {
  req.app.locals.currentLink = "article";
  const { id } = req.query;
  // console.log('id :>> ', id);
  if (id) {
    let article = await Article.findOne({ _id: id });
    console.log("article :>> ", article);
    res.render("admin/article/edit.art", {
      message: "修改文章",
      article: article,
      button: "修改",
      link: "/admin/article/edit?id=" + id,
    });
  } else {
    res.render("admin/article/edit.art", {
      message: "创建文章",
      button: "添加",
      link: "/admin/article/add",
      article: { publishDate: new Date() },
    });
  }
};
//添加
const add = async (req: Request, res: Response) => {
  // 1.创建表单解析对象  // uploadDir:配置上传文件的存放位置  keepExtensions:保留上传文件的后缀
  const form = formidable({
    uploadDir: path.join(__dirname, "../", "public", "uploads"),
    keepExtensions: true,
  });
  try {
    // 2.解析表单
    form.parse(req, async (err: any, fieldsArr: any, files: any) => {
      // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
      // 2.fields 对象类型 保存普通表单数据
      // 3.files 对象类型 保存了和上传文件相关的数据
      // res.send(files.cover.path.split('public')[1])
      const fields = getFormObj(fieldsArr);
      fields.author = fields.author.replaceAll('"', ""); // new ObjectId(fields.author.replace('"',''));
      await Article.create({
        title: fields.title,
        author: fields.author, // new ObjectId(fields.author),
        publishDate: fields.publishDate,
        cover: fields.cover,
        content: fields.content,
      });
      // 将页面重定向到文章列表页面
      res.redirect("/admin/article");
    });
  } catch (ex: any) {
    console.log("ex", ex);
  }
  // res.send('ok');
};

//编辑
const edit = async (req: Request, res: Response) => {
  // 1.创建表单解析对象
  const form = formidable({
    uploadDir: path.join(__dirname, "../", "public", "uploads"),
    keepExtensions: true,
  });
  const id = req.query.id;

  // 2.解析表单
  form.parse(req, async (err: any, fieldsArr: any, files: any) => {
    // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
    // 2.fields 对象类型 保存普通表单数据
    // 3.files 对象类型 保存了和上传文件相关的数据
    // res.send(files.cover.path.split('public')[1])
    const fields = getFormObj(fieldsArr);
    console.log("fields :>> ", fields, id);
    //修改
    await Article.updateOne(
      { _id: id },
      {
        title: fields.title,
        // author: fields.author,
        cover: fields.cover,
        content: fields.content,
      },
    );
    // 将页面重定向到文章列表页面
    res.redirect("/admin/article");
  });
  // res.send('ok');
};
//删除
const remove = async (req: Request, res: Response) => {
  // 根据id删除文章
  const result = await Article.findOneAndDelete({ _id: req.query.id });
  console.log("req.query.id :>> ", req.query.id, result);
  if (result) {
    // 将页面重定向到文章列表页面
    res.redirect("/admin/article");
  } else {
    //删除失败
  }
};
//上传图片
const uploadImg = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1.创建表单解析对象
    const form = formidable({
      uploadDir: path.join(__dirname, "../", "public", "uploads/images"),
      keepExtensions: true,
    });
    // 2.解析表单
    form.parse(req, async (err: any, fields: any, files: any) => {
      // 1.err错误对象 如果表单解析失败 err里面存储错误信息 如果表单解析成功 err将会是null
      // 2.fields 对象类型 保存普通表单数据
      // 3.files 对象类型 保存了和上传文件相关的数据
      // console.log('files :>> ', files, files.upload);
      let filename = files.upload.path.split("public")[1];
      // console.log('filename', filename);
      return res.json({ uploaded: true, url: filename });
      // res.send(files.cover.path.split('public')[1])
    });
  } catch (e: any) {
    console.log(e);
  }
};

export default {
  registerRoutes,
  articlePage,
  editView,
  add,
  edit,
  remove,
  uploadImg,
};
