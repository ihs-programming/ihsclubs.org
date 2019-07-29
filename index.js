const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = "./data";
const dataPageDir = `${dataDir}/pages`;

app.set("view engine", "ejs");
app.set("view cache", "true");
app.use(express.static(path.join(__dirname, "static")));

const validate = str => str.match(/^[0-9a-zA-Z-_]+$/);

const indexConfig = require(`${dataDir}/index.json`);

app.get("/", (req, res) => {
  return res.render("index", indexConfig); 
});

app.get("/:club", (req, res, next) => {
  const {club} = req.params;
  
  if(!validate(club)) return next();

  const configPath = `${dataPageDir}/${club}.json`;
  if(fs.existsSync(configPath)) {
    res.redirect(`/${req.params.club}/index`);
  }
  next();
});


app.get("/:club/:page", (req, res, next) => {
  const {club, page} = req.params;
  
  if(!validate(club) || !validate(page)) return next();

  const configPath = `${dataPageDir}/${club}.json`;
  if(fs.existsSync(configPath)) {
    const config = require(configPath);
    const pagePath = `${club}/pages/${page}`;

    const currentPage = config.pages.find(({name}) => name === page);
    if(currentPage !== undefined) {
      config.currentPage = currentPage;
      if(fs.existsSync(`./views/${pagePath}.ejs`)) {
        return res.render(pagePath, config);
      } else {
        if(fs.existsSync(`./views/${club}/pages/index.ejs`)) {
          return res.render(`${club}/pages/index`, config);
        } else {
          return res.render(`default/pages/index`, config);
        }
      }
    }
  }
  next();
});

app.listen(PORT, () => console.log(`Started server at port ${PORT}`));
