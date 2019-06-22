# ihsclubs.org
This is the repository for the <ihsclubs.org> domain. 

## Overview
The server runs on a [NodeJS](https://nodejs.org/en/) backend built on [Express](https://expressjs.com/). Templating is done through [ejs](https://ejs.co/). The template generator was built with convention over configuration in mind, with sane defaults. However, if desired, everything is highly configurable down to the individual html files. 

## Directory Structure
`/data` stores configuration files. `/data/${name}.json` is the configuration file for the subpage with `name`. 

`/static` stores static files such as javascript and css. Note that any files in `/static` will override their counterparts in `/views/`. Thus, if you wanted to deploy custom webpages, you should serve them here. 

`/views/` stores the ejs files that are rendered for the user. All of the files related to a particular subpage are organized are `/views/${name}`. 

`/views/${name}/partials` stores partials such as the navbar and header code. 
`/views/${name}/pages` stores complete webpages.

## Webserver Structure
The web root `/` contains a listing of all the subpages. Each individual subpage can be found at `/${name}/*` with its homepage located at `/${name}/index`. 

## Config Structure
| Variable  | Meaning |
| ------------- | ------------- |
| theme  | The color theme for the subpage's icons and header  |
| title  | The title of the subpages. This goes in <title></title>.  |
| pages  | An array containing all of the pages. e.g. `/index`, `/announcements` |
