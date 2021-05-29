import express from "express";
import cors from 'cors'
import routes from './routes'
import dotenv  from "dotenv";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares()
    this.routes()
  }

  private middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    dotenv.config()
  }

  private routes() {
      this.express.use(routes)
  }
}

const app = new App().express

app.listen(3000, () => {
    console.log('server on')
})