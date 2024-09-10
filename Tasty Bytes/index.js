import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const recipeJSON =
  '[{"id":"0001","type":"pastry","name":"Brownie","length":30,"ingredients":[{"name":"Granulated Sugar","quantity":"1 1/2 cups"},{"name":"All-Purpose Flour","quantity":"3/4 cup"},{"name":"Cocoa Powder","quantity":"2/3 cup"},{"name":"Pwdered Sugar","quantity":"1/2 Cup"},{"name":"Chocolate Chips","quantity":"1/2 cup"},{"name":"Sea Salt","quantity":"3/4 teaspoons"},{"name":"Large Eggs","quantity":"2"},{"name":"Canola Oil","quantity":"1/2 cup"},{"name":"Water","quantity":"2 tablespoons"},{"name":"vanilla","quantity":"1/2 teaspoon"}]},{"id":"0002","type":"pastry","name":"Cookie","length":20,"ingredients":[{"name":"All-Purpose Flour","quantity":"2 1/4 cups"},{"name":"Baking Soda","quantity":"1 teaspoon"},{"name":"Cornstarch","quantity":"1 1/2 teaspoons"},{"name":"Salt","quantity":"1/2 teaspoons"},{"name":"Unsalted Butter","quantity":"3/4 cup"},{"name":"Brown Sugar","quantity":"3/4 cup"},{"name":"Granulated Sugar","quantity":"1/2 cup"},{"name":"Large Egg","quantity":"1"},{"name":"Pure Vanilla Extract","quantity":"2 teaspoons"},{"name":"Chocolate Chips","quantity":"1 1/4 cups"}]},{"id":"0003","type":"pastry","name":"Eclair","length":80,"ingredients":[{"name":"Water","quantity":"1 cup"},{"name":"Butter","quantity":"1/2 cup"},{"name":"All-Purpose Flour","quantity":"1 cup"},{"name":"Salt","quantity":"1/4 teaspoon"},{"name":"Large Eggs","quantity":"4"},{"name":"Cold Milk","quantity":"2 1/2 cups"},{"name":"Instant Pudding Mix","quantity":"1"},{"name":"Heavy Cream","quantity":"1 cup"},{"name":"Vanilla Extract","quantity":"1 teaspoon"},{"name":"Chocolate","quantity":"1 ounce"},{"name":"Hot Water","quantity":"3 tablespoons"}]},{"id":"0004","type":"pastry","name":"Flan","length":200,"ingredients":[{"name":"White Sugar","quantity":"1 cup"},{"name":"Large Eggs","quantity":"3"},{"name":"Sweetened Condensed Milk","quantity":"14 ounces"},{"name":"Evaporated Milk","quantity":"12 fluid ounces"},{"name":"Vanilla Extract","quantity":"1 tablespoon"}]}]';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let data;

app.get("/", (req, res) => {
  res.render("index.ejs", { recipe: data});
});

app.post("/recipe", (req, res) => {
  switch (req.body.choice){
    case "brownie":
      data = JSON.parse(recipeJSON)[0];
      break;
    case "cookie":
      data = JSON.parse(recipeJSON)[1];
      break;
    case "eclair":
      data = JSON.parse(recipeJSON)[2];
      break;
    case "flan":
      data = JSON.parse(recipeJSON)[3];
      break;
    default:
      break;
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
