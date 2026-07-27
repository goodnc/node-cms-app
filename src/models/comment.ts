// 引入mongoose模块
import { Document, Schema, model } from "mongoose";

interface IComment extends Document {
  aid: Schema.Types.ObjectId;
  uid: Schema.Types.ObjectId;
  time: Date;
  content: string;
}
// 创建评论集合规则
const commentSchema = new Schema<IComment>({
  // 文章id
  aid: {
    type: Schema.Types.ObjectId,
    ref: "Article",
  },
  // 评论人用户id
  uid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // 评论时间
  time: {
    type: Date,
  },
  // 评论内容
  content: {
    type: String,
  },
});

// 创建评论集合
const Comment = model<IComment>("Comment", commentSchema);
// 将评论集合构造函数作为模块成员进行导出
export { Comment };
