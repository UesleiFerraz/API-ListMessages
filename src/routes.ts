import { Router } from "express";
import ScrapController from "./controllers/ScrapController";
import UserController from "./controllers/UserController";
import userAuth from "./middlewares/userAuth";
import userHasSameId from "./middlewares/userHasSameId";

const routes = Router();

routes.get("/", userAuth, UserController.listAllUsers);
routes.get("/users/:userId", [userAuth, userHasSameId], UserController.listOneUser);
routes.get("/users/:userId/scraps", [userAuth, userHasSameId], ScrapController.listAllScrapsUser);
routes.get("/users/:userId/scraps/:scrapId", userAuth, ScrapController.listOneScrapUser);

routes.post("/users", UserController.addUser);
routes.post("/auth", UserController.login);
routes.post("/users/:userId/scraps", [userAuth, userHasSameId], ScrapController.addScrap);

routes.put("/users/:userId", [userAuth, userHasSameId], UserController.updateUser);
routes.put("/users/:userId/scraps/:scrapId", [userAuth, userHasSameId], ScrapController.updateScrap);

routes.delete("/users/:userId", [userAuth, userHasSameId], UserController.deleteUser);
routes.delete("/users/:userId/scraps/:scrapId", [userAuth, userHasSameId], ScrapController.deleteScrap);

export default routes;
