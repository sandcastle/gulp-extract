# gulp-extract [![Build Status](https://travis-ci.org/sandcastle/gulp-extract.svg)](https://travis-ci.org/sandcastle/gulp-extract)
> A gulp plugin for extracting file contents into a hash

## Usage

Install `gulp-extract` as a development dependency:

```shell
npm install gulp-extract --save-dev
```

## Extracting file contents

Given the following directory structure:

```
├── gulpfile.js              # Your gulpfile
└── src/                     # Your application's source files
    └── layouts/             # A folder containing layouts
        └── root.hbs
        └── docs.hbs
        └── home.hbs
```

#### gulpfile.js
```js
var extract = require('gulp-extract');

gulp.task('templates', function(){
  var hash = {};
  return gulp.src('src/layouts/*.hbs')
    .pipe(extract(hash));
  // do something with hash
});
```

Running the above gulp task would result in the hash containing 3 variables, 
each with the contents of the file:

```
console.log(hash.root);
console.log(hash.docs);
console.log(hash.home); 
```

## Example

A real world example of using this plugin, is combining it with the 
`gulp-handlebars-extended` plugin.

#### gulpfile.js
```js
var extract = require('gulp-extract');
var hbx = require('gulp-handlebars-extended');

gulp.task('static', function(){

  var layouts = {};
  gulp.src('src/layouts/*.hbs')
    .pipe(extract(layouts));

  var data = { site: 'my-site', author: 'Jo Jo' };
  
  return gulp.src('src/pages/*.hbs')
    .pipe(hbx(data, { layouts: layouts }))
    .pipe(gulp.dest('dist'));
});
```
