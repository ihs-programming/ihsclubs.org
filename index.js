const express = require("express");
const fs = require("fs");
const autoprefixer = require('express-autoprefixer');
const lessMiddleware = require('less-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = "./data";
const dataPageDir = `${dataDir}/pages`;

app.set("view engine", "ejs");
app.set("view cache", "true");

const staticPath = __dirname + '/static';
app.use(lessMiddleware(staticPath));
app.use(autoprefixer({browsers: ["last 3 versions", "> 1%"], cascade: false}));
app.use(express.static(staticPath));

const validate = str => str.match(/^[0-9a-zA-Z-_]+$/);

const indexConfig = require(`${dataDir}/index.json`);

app.get("/", (req, res) => {
  return res.render("index", indexConfig); 
});

const render = (res, club, page) => {
  const configPath = `${dataPageDir}/${club}.json`;
  if(fs.existsSync(configPath)) {
    const config = require(configPath);

    const pagePath = `${club}/pages/${page}`;

    const currentPage = config.pages.find(({name}) => name === page);
    if(currentPage !== undefined) {
      config.currentPage = currentPage;
      if(fs.existsSync(`./views/${pagePath}.ejs`)) {
        res.render(pagePath, config);
      } else {
        if(fs.existsSync(`./views/${club}/pages/index.ejs`)) {
          res.render(`${club}/pages/index`, config);
        } else {
          res.render(`default/pages/index`, config);
        }
      }
      return true;
    }
  }
  return false;
}

app.get("/:club", (req, res, next) => {
  if(!req.url.endsWith("/")) res.redirect(req.url + "/");
  const {club} = req.params;
  
  if(!validate(club)) return next();

  const configPath = `${dataPageDir}/${club}.json`;
  if(fs.existsSync(configPath)) {
    if(render(res, club, "index")) return;
  }

  next();
});


app.get("/:club/:page", (req, res, next) => {
  const {club, page} = req.params;
  
  if(!validate(club) || !validate(page)) return next();
  if(page === "index") return res.redirect(`/${club}/`);

  if(!render(res, club, page)) next();
});

const redirects = indexConfig.redirects;
app.get("/redirect/:page", (req, res) => {
  if(Object.keys(redirects).includes(req.params["page"])) return res.redirect(redirects[req.params["page"]]);
  return res.send("Invalid url");
});

app.listen(PORT, () => console.log(`Started server at port ${PORT}`));
