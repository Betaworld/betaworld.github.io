# Betaworld Website

This is a [browserfied](http://browserify.org) application which controls all aspects of the Betaworld website.

## Source Files & Compilation

All source files for the website are located in the `assets/` directory, but must be compiled into a static application before they are useable.

### Source File Anatomy

* Inside of the `/assets/` directory there are **four sub-directories** labeled:
    * `/assets/jade/`
    * `/assets/javascript/`
    * `/assets/stylus/`
    * `/assets/images/`
* `/assets/jade/index.jade` is a required asset.
    * It compiles into `/index.html`
* `/assets/javascript/application.js` is a required asset.
    * It compiles into `/javascripts/betaworld.bundle.js`.
* `/assets/stylus/main.stylus` is a required asset.
    * It compiles into `/stylesheets/betaworld.css`.

**Example skeleton `tree` output for asset and static directories:**
```shell
$ tree betaworld.github.io
betaworld.github.io
├── assets
│   ├── jade
│   │   └── index.jade
│   ├── javascript
│   │   └── main.js
│   ├── stylus
│   │   └── main.stylus
│   └── images
├── javascript
│   └── betaworld.bundle.js
├── stylesheets
│   └── betaworld.css
├── images
└── index.html
```

### Gulp Compilation

This project uses [gulp](gulpjs.com) to compile assets into a static application that can be served by GitHub pages:

1. Navigate to the project directory in your terminal: `cd /your/projects/betaworld.github.io/`
2. Type `gulp` to begin the compilation process.

#### Gulp Watch

If you're working on the site, you probably don't want to keep typing `gulp` each time that you make a change.

* Type `gulp watch` instead of `gulp` to automatically update static files whenever you make a change to the asset files.