const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

app.get("/:club", (req, res, next) => {
  const {club, page} = req.params;

  const configPath = `${dataDir}/${club}.json`;
  if(fs.existsSync(configPath)) {
    res.redirect(`/${req.params.club}/index`);
  }
  next();
});


const dataDir = "./data";
app.get("/:club/:page", (req, res, next) => {
  const {club, page} = req.params;

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
