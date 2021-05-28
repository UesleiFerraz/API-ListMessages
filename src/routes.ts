import { Router } from "express";
import UserController from "./controllers/UserController";

const routes = Router();

routes.get("/", UserController.listAllUsers)
routes.get("/users/:userId", UserController.listOneUser)
routes.post('/users', UserController.addUser)
routes.delete('/users/:userId', UserController.deleteUser)
routes.put('/users/:userId', UserController.updateUser)

export default routes;
