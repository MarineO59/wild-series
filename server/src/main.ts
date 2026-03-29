import "dotenv/config";
import "../database/checkConnection";
import type { RequestHandler } from "express";
import app from "./app";

const sayWelcome: RequestHandler = (req, res) => {
  res.send("Welcome to Wild Series !");
};

app.get("/", sayWelcome);

const port = process.env.APP_PORT;

app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });
