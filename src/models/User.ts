import { v4 as uuidGenerator } from "uuid";
import Scrap from "./Scrap";

export default class User {
  private id: string;
  private username: string;
  private password: string;
  private scraps: Scrap[] = [];

  constructor(username: string, password: string) {
    this.id = uuidGenerator();
    this.username = username;
    this.password = password;
  }

  public getId(): string {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getPassword(): string {
    return this.password;
  }
  public setPassword(password: string): void {
    this.password = password;
  }

  public getScraps(): Scrap[] {
    return this.scraps;
  }

  public addScrap(scrap: Scrap): void {
    this.scraps.unshift(scrap);
  }
}

let users: User[] = [];
export { users };
