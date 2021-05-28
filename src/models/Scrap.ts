import { v4 as uuidGenerator } from "uuid";

export default class Scrap {
  private id: string;
  private userId: string;
  private description: string;
  private detais: string;

  constructor(description: string, detais: string, userId: string) {
    this.id = uuidGenerator();
    this.userId = userId;
    this.description = description;
    this.detais = detais;
  }

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getDetais(): string {
    return this.detais;
  }

  public setDetais(detais: string): void {
    this.detais = detais;
  }
}
