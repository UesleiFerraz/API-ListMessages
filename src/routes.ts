import { Router } from "express";
import ScrapController from "./controllers/ScrapController";
import UserController from "./controllers/UserController";

const routes = Router();

routes.get("/", UserController.listAllUsers);
routes.get("/users/:userId", UserController.listOneUser);
routes.get("/users/:userId/scraps", ScrapController.listAllScrapsUser);
routes.get("/users/:userId/scraps/:scrapId", ScrapController.listOneScrapUser);

routes.post("/users", UserController.addUser);
routes.post("/auth", UserController.login);
routes.post("/users/:userId/scraps", ScrapController.addScrap);

routes.put("/users/:userId", UserController.updateUser);
routes.put("/users/:userId/scraps/:scrapId", ScrapController.updateScrap);

routes.delete("/users/:userId", UserController.deleteUser);
routes.delete("/users/:userId/scraps/:scrapId", ScrapController.deleteScrap);

export default routes;
