const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

const validate = str => str.match(/^[0-9a-z]+$/);

app.get("/:club", (req, res, next) => {
  const {club} = req.params;
  
  if(!validate(club)) return next();

  const configPath = `${dataDir}/${club}.json`;
  if(fs.existsSync(configPath)) {
    res.redirect(`/${req.params.club}/index`);
  }
  next();
});


const dataDir = "./data";
app.get("/:club/:page", (req, res, next) => {
  const {club, page} = req.params;
  
  if(!validate(club) || !validate(page)) return next();

  const configPath = `${dataDir}/${club}.json`;
  if(fs.existsSync(configPath)) {
    const config = require(configPath);
    config.currentPage = page;

    const pagePath = `${club}/pages/${page}`;

    if(fs.existsSync(`./views/${pagePath}.ejs`)) {
      return res.render(pagePath, config);
    }
  }
  next();
});

app.listen(PORT, () => console.log(`Started server at port ${PORT}`));
