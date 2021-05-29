import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { users } from "../models/User";
import jwt from "jsonwebtoken";

class UserController {
  public async addUser(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "body invalid" });
    }

    const usernameExists = users.find(user => user.getUsername() === username);
    if (usernameExists) {
      return res.status(409).json({ error: "username already in use" });
    }

    const user = new User(username, await bcrypt.hash(password, 10));
    users.push(user);
    return res.json({ userId: user.getId(), username: user.getUsername() });
  }

  public deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "id invalid" });
    }

    const userExists = users.findIndex(user => user.getId() === userId);
    if (userExists < 0) {
      return res.status(404).json({ error: "user not found" });
    }

    users.splice(userExists, 1);
    return res.sendStatus(204);
  }

  public async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { username, password } = req.body;
    if (!username || !password || !userId) {
      return res.status(400).json({ error: "parameter(s) invalid" });
    }

    const userExists = users.findIndex(user => user.getId() === userId);
    if (userExists < 0) {
      return res.status(404).json({ error: "user not found" });
    }

    const usernameExists = users.find(user => {
      return user.getUsername() === username && user.getId() !== userId;
    });
    if (usernameExists) {
      return res.status(409).json({ error: "username already in use" });
    }

    users[userExists].setUsername(username);
    users[userExists].setPassword(await bcrypt.hash(password, 10));

    return res.json({
      userId,
      username,
      scraps: users[userExists].getScraps(),
    });
  }

  public listOneUser(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "id invalid" });
    }

    const userExists = users.find(user => user.getId() === userId);
    if (!userExists) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.json({
      userId,
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

    return res.json({ users: usersWhitoutPassword });
  }

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const user = users.find(user => user.getUsername() === username);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const result = await bcrypt.compare(password, user.getPassword());
    if (!result) {
      return res.status(406).json({ error: "password wrong" });
    }

    const secret = process.env.SECRET;
    if (secret) {
      const token = jwt.sign({ userIdToken: user.getId() }, secret, {
        expiresIn: "1h",
      });

      return res.json({ token });
    }

    return res.sendStatus(500);
  }
}

export default new UserController();
