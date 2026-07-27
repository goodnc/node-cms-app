import { Application } from "express";

import homeController from "./controllers/home-controller";
import articleController from "./controllers/article-controller";
import userController from "./controllers/user-controller";
import loginController from "./controllers/login-controller";

export default function (app: Application) {
  homeController.registerRoutes(app);
  articleController.registerRoutes(app);
  userController.registerRoutes(app);
  loginController.registerRoutes(app);
}
