import { Request, Response } from "express";
import Scrap from "../models/Scrap";
import { users } from "../models/User";

class ScrapController {
  public addScrap(req: Request, res: Response) {
    const { userId } = req.params;
    const { description, details } = req.body;
    if (!userId || !description || !details) {
      return res.json({ error: "parameter(s) invalid" }).status(400);
    }

    const userExists = users.findIndex(user => user.getId() === userId);
    if (userExists < 0) {
      return res.json({ error: "user not found" }).status(404);
    }

    const scrap = new Scrap(description, details, userId);
    users[userExists].addScrap(scrap);

    return res.json({ scrap });
  }
}

export default new ScrapController();
