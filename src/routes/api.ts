import { Router } from "express";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { ParksInt } from "../interfaces/ParksInt";
dotenv.config();

const router: Router = Router();
const key = process.env.API_KEY || "";

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../views/index.html"));
});

router.post("/search", async (req, res) => {
  let url = `https://developer.nps.gov/api/v1/parks?api_key=${key}`;
  if (req.body.state) url += `&stateCode=${req.body.state}`;
  if (req.body.pname) url += `&q=${req.body.pname}`;
  const data = await fetch(url);
  const parkData: ParksInt = await data.json();
  const filteredData = parkData.data
    .map((el) => {
      let string = `<div class="result-card"><h2><a href=${el.url}>${el.fullName}</a></h2><p>${el.description}</p><p>${el.weatherInfo}</p><p>${el.directionsInfo}</p>`;
      const images = el.images
        .map((image) => {
          return `<img src=${image.url} alt=${image.altText} class="pimage">`;
        })
        .slice(0, 2)
        .join("");
      if (images) string += images;
      string += "</div>";
      return string;
    })
    .join("");
  res.send(filteredData);
});

export default router;
