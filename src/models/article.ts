// 创建文章集合
// 1.引入mongoose模块
import { Document, Schema, model } from "mongoose";
interface IArticle extends Document {
  title: string;
  author: Schema.Types.ObjectId;
  publishDate: Date;
  cover: string;
  content: string;
}
// 2.创建文章集合规则
const articleSchema = new Schema<IArticle>({
  //文章标题
  title: {
    type: String,
    maxlength: 30,
    minlength: 4,
    required: [true, "请填写文章标题"],
  },
  //作者
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "请传递作者"],
  },
  //发布时间
  publishDate: {
    type: Date,
    default: Date.now,
  },
  //封面
  cover: {
    type: String,
    default: null,
  },
  //内容
  content: {
    type: String,
  },
});
// 3.根据规则创建集合
const Article = model<IArticle>("Article", articleSchema);
// 4.将集合作为模块成员进行导出
export { Article };
