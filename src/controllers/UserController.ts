import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
let users: User[] = [];

class UserController {
  public async addUser(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.json({ error: "body invalid" }).status(400);
    }

    const usernameExists = users.find(user => user.getUsername() === username);
    if (usernameExists) {
      return res.json({ error: "username already in use" }).status(409);
    }

    const user = new User(username, await bcrypt.hash(password, 10));
    users.push(user);
    return res.json({ userId: user.getId(), username: user.getUsername() });
  }

  public deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.json({ error: "id invalid" }).status(400);
    }

    const userExists = users.findIndex(user => user.getId() === id);
    if (userExists < 0) {
      return res.json({ error: "user not found" }).status(404);
    }

    users.splice(userExists, 1);
    return res.sendStatus(204);
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { username, password } = req.body;
    if (!username || !password || !id) {
      return res.json({ error: "parameters invalid" }).status(400);
    }

    const userExists = users.findIndex(user => user.getId() === id);
    if (userExists < 0) {
      return res.json({ error: "user not found" }).status(404);
    }

    const usernameExists = users.find(user => {
      return user.getUsername() === username && user.getId() !== id;
    });
    if (usernameExists) {
      return res.json({ error: "username already in use" }).status(409);
    }

    users[userExists].setUsername(username);
    users[userExists].setPassword(await bcrypt.hash(password, 10));

    return res.json({
      userId: users[userExists].getId(),
      username: users[userExists].getUsername(),
      scraps: users[userExists].getScraps(),
    });
  }

  public listOneUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.json({ error: "id invalid" }).status(400);
    }

    const userExists = users.find(user => user.getId() === id);
    if (!userExists) {
      return res.json({ error: "user not found" }).status(404);
    }

    return res.json({
      userId: userExists.getId(),
      username: userExists.getUsername(),
      scraps: userExists.getScraps(),
    });
  }

  public listAllUsers(req: Request, res: Response) {
    let usersWhitoutPassword: object[] = [];

    users.forEach(user => {
      const newUser = {
        id: user.getId(),
        username: user.getUsername(),
        scraps: user.getScraps(),
      };

      usersWhitoutPassword.push(newUser);
    });

    return res.json({ usersWhitoutPassword });
  }
}

export default new UserController();