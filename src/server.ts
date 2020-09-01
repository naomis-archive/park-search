import dotenv from "dotenv";
import express, { Express } from "express";
import bodyparser from "body-parser";
import path from "path";
import main from "./routes/api";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname + "/../public/")));

app.use(main);

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
