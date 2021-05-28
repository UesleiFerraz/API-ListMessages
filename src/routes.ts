import { Router } from "express";
import UserController from "./controllers/UserController";

const routes = Router();

routes.get("/", UserController.listAllUsers)
routes.get("/users/:id", UserController.listOneUser)
routes.post('/users', UserController.addUser)
routes.delete('/users/:id', UserController.deleteUser)
routes.put('/users/:id', UserController.updateUser)

export default routes;
