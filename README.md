# node-cms-app

基于 Express + TypeScript 开发的轻量级后台CMS服务端模板，使用 tsx 运行开发环境，Yarn 管理依赖，Mongoose 操作MongoDB。

## 技术栈

- Runtime: Node.js v22+
- 语言: TypeScript 7.x
- Web框架: express
- 开发运行工具: tsx（替代ts-node，解决TS7兼容报错）
- 包管理器: Yarn v1
- 数据库: Mongoose
- 类型支持: @types/express / @types/node / @types/mongoose

## 项目目录规范（MVC分层）

src/
├── app.ts # 项目入口、路由挂载、服务启动
├── controller/ # 控制器层，接收请求、返回响应
│ └── homeController.ts
├── router/ # 路由分层，按业务拆分
│ └── homeRouter.ts
├── service/ # 业务逻辑层
├── model/ # Mongoose 数据库模型
├── config/ # 环境配置、数据库连接
└── utils/ # 通用工具函数

## 快速启动

### 1. 克隆仓库

```bash
git clone https://github.com/goodnc/node-cms-app.git
cd node-cms-app
```

### 2. 安装依赖

使用 yarn 安装（推荐，项目锁定 yarn.lock）

```
yarn install
```

### 3. 开发环境运行

使用 tsx 启动（解决 ts-node + TS7 版本兼容崩溃问题）

```
yarn dev
```

### 4. TS 编译打包（生产部署）

```
yarn build
# 运行编译后的js
node dist/app.js
```
