// 引入mongoose第三方模块
import mongoose from "mongoose";
import config from "config";

//连接数据库
export function openConnectDb() {
  console.log("title", config.get("title"), config.get("db.pwd"));
  const url = `mongodb://${config.get("db.user")}:${config.get("db.pwd")}@${config.get("db.host")}:${config.get("db.port")}/${config.get("db.name")}`;
  console.log("url", url);
  // 连接数据库
  mongoose
    .connect(
      url,
      // {
      //   dbName: config.get('db.name'),
      //   user: config.get('db.user'),
      //   pass: config.get('db.pwd'),
      //   autoCreate:true
      // }
    )
    .then(() => console.log("数据库连接成功"))
    .catch((e) => console.log("数据库连接失败", e));
}
