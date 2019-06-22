# ihsclubs.org
This is the repository for the [ihsclubs.org](ihsclubs.org) domain. 

## Overview
The server runs on a [NodeJS](https://nodejs.org/en/) backend built on [Express](https://expressjs.com/). Templating is done through [ejs](https://ejs.co/). The template generator was built with convention over configuration in mind, with sane defaults. However, if desired, everything is highly configurable down to the individual html files. 

## Directory Structure
`/data` stores configuration files. `/data/${name}.json` is the configuration file for the subpage with `name`. 

`/static` stores static files such as javascript and css. Note that any files in `/static` will override their counterparts in `/views/`. Thus, if you wanted to deploy custom webpages, you should serve them here. 

`/views/` stores the ejs files that are rendered for the user. All of the files related to a particular subpage are organized are `/views/${name}`. 

`/views/${name}/partials` stores partials such as the navbar and header code. 
`/views/${name}/pages` stores complete webpages. The default template is located at `/views/${name}/pages/index.ejs` and should suffice for most pages. However, if you wish to implement a custom page, adding `/views/${name}/pages/${pageName}.ejs` will override the default template. 

## Webserver Structure
The web root `/` contains a listing of all the subpages. Each individual subpage can be found at `/${name}/*` with its homepage located at `/${name}/index`. 

## Creating New Subpages
```bash
$ cp -r ./views/programming ./views/${name}
$ cp ./data/programming.json ./data/${name}.json
```
Then modify `./data/${name}.json` as you see fit. 

**Note that the name must be alphanumeric**. 

## Development
Set `$PORT` to modify the port the server listens to. The default is `$PORT = 3000`. 

`npm run dev` starts the dev server.


## Config Structure
| Variable  | Meaning |
| ------------- | ------------- |
| theme  | The color theme for the subpage's icons and header  |
| title  | The title of the subpages. This goes in <title></title>.  |
| pages  | An array containing all of the pages. e.g. `/index`, `/announcements` |

### Pages
Each page is an object. 

| Variable  | Meaning |
| ------------- | ------------- |
| name  | The page's pathname. The page will be located at `/views/${name}/${pageName}`.  |
| navName  | Stands for navbar name; the name that displays in the navbar.   |
| title  | The name that displays in the header. |
| panels  | An array containing each of the text panels. e.g. "Welcome to Programming Club" |

### Panels
Text on the webpage is displayed in a series of panels. Each panel is also represented as an object. 

| Variable  | Meaning |
| ------------- | ------------- |
| title  | The panel's title, displayed as a `<h1></h1>` element.  |
| text  | The corresponding text for the panel    |
| img  | The image that is displayed next to the panel |

### Images
A custom object is defined to faciliate displaying of images. 

| Variable  | Meaning |
| ------------- | ------------- |
| type  | "icon" or "image"  |
| name  | if type == "icon", the name of the [Font Awesome](https://fontawesome.com/v4.7.0/icons/) icon |

