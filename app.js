const express = require("express");
const app = express();
const axois = require("axios");
const ejsMate = require("ejs-mate");
const path = require("path");
const { default: axios } = require("axios");

let moviefetch;

app.set(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "design")));

const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const searchApi =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

app.get("/movies", async (req, res) => {
  const { data } = await axios(apiUrl).catch((e) => console.log(e));
  moviefetch = data.results;
  res.render("main", { Data: data.results });
});

app.get("/movies/srh", async (req, res) => {
  const { search } = req.query;
  console.log(search);
  console.log(req.query);
  const { data } = await axios(`${searchApi}${search}`).catch((e) =>
    console.log(e)
  );
  moviefetch = data.results;
  res.render("main", { Data: data.results });
});

app.get("/movies/:id/show", async (req, res) => {
  const { id } = req.params;
  res.render("show", { moviefetch, id });
});

app.listen(3000, () => {
  console.log("on port 3000");
});
