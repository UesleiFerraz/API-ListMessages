import { Request, Response } from "express";
import Scrap from "../models/Scrap";
import { users } from "../models/User";

class ScrapController {
  public addScrap(req: Request, res: Response) {
    const { userId } = req.params;
    const { description, details } = req.body;
    if (!userId || !description || !details) {
      return res.status(400).json({ error: "parameter(s) invalid" });
    }

    const userExists = users.findIndex(user => user.getId() === userId);
    if (userExists < 0) {
      return res.status(404).json({ error: "user not found" });
    }

    const scrap = new Scrap(description, details, userId);
    users[userExists].addScrap(scrap);

    return res.json({ scrap });
  }

  public listAllScrapsUser(req: Request, res: Response) {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "id invalid" });
    }

    const userExists = users.find(user => user.getId() === userId);
    if (!userExists) {
      return res.status(404).json({ error: "user not found" });
    }

    return res.json({ scraps: userExists.getScraps() });
  }

  public listOneScrapUser(req: Request, res: Response) {
    const { userId, scrapId } = req.params;
    if (!userId || !scrapId) {
      return res.status(400).json({ error: "parameter(s) invalid" });
    }

    const userExists = users.find(user => user.getId() === userId);
    if (!userExists) {
      return res.status(404).json({ error: "user not found" });
    }

    const scrapExists = userExists.getScraps().find(scrap => {
      return scrap.getId() === scrapId;
    });
    if (!scrapExists) {
      return res.status(404).json({ error: "scrap not found" });
    }

    return res.json({ scrap: scrapExists });
  }

  public deleteScrap(req: Request, res: Response) {
    const { userId, scrapId } = req.params;
    if (!userId || !scrapId) {
      return res.status(400).json({ error: "parameter(s) invalid" });
    }

    const userExists = users.findIndex(user => user.getId() === userId);
    if (userExists < 0) {
      return res.status(404).json({ error: "user not found" });
    }

    const scrapExists = users[userExists].getScraps().findIndex(scrap => {
      return scrap.getId() === scrapId;
    });
    if (scrapExists < 0) {
      return res.status(404).json({ error: "scrap not found" });
    }

    users[userExists].getScraps().splice(scrapExists, 1);

    return res.sendStatus(204);
  }

  public updateScrap(req: Request, res: Response) {
    const { userId, scrapId } = req.params;
    const { description, details } = req.body;
    if (!userId || !scrapId || !description || !details) {
      return res.status(400).json({ error: "parameter(s) invalid" });
    }

    const userExists = users.findIndex(user => user.getId() === userId);
    if (userExists < 0) {
      return res.status(404).json({ error: "user not found" });
    }

    const scrapExists = users[userExists].getScraps().findIndex(scrap => {
      return scrap.getId() === scrapId;
    });
    if (scrapExists < 0) {
      return res.status(404).json({ error: "scrap not found" });
    }

    users[userExists].getScraps()[scrapExists].setDescription(description);
    users[userExists].getScraps()[scrapExists].setDetais(details);

    return res.json({ scrap: users[userExists].getScraps()[scrapExists] });
  }
}

export default new ScrapController();
