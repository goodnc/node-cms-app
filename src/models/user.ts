// 创建用户集合
// 引入mongoose第三方模块
import { Document, Schema, model } from "mongoose";

// 导入bcryptjs
import bcrypt from "bcryptjs";

// 引入Joi模块
import Joi from "joi";
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  status: number;
  createTime: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 16,
  },
  email: {
    type: String,
    unique: true, //保证邮箱地址在插入数据库时不重复
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // 状态：0 启用状态；1 禁用状态
  status: {
    type: Number,
    default: 0,
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now, //默认当前时间
  },
});

//创建集合
const User = model<IUser>("User", userSchema);
async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash("123456", salt);
  const user = await User.create({
    username: "jack",
    email: "admin@test.com",
    password: pass,
    role: "admin",
    status: 0,
  });
}

// createUser(); //初始化一个用户

// 验证用户信息
const validateUser = (user: IUser) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("用户名不符合验证规则")),
    email: Joi.string()
      .email()
      .required()
      .error(new Error("邮箱格式不符合要求")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3, 30}$/)
      .required()
      .error(new Error("密码格式不符合要求")),
    role: Joi.string()
      .valid("normal", "admin")
      .required()
      .error(new Error("角色值非法")),
    status: Joi.number().valid(0, 1).required().error(new Error("状态值非法")),
  });
  // 实施验证
  return schema.validate(user);
};

// 将用户集合作为模块成员进行导出
export { IUser, User, validateUser };
