'use strict';
var path = require('path');
var through2 = require('through2');
var gutil = require('gulp-util');


var PLUGIN_NAME = 'gulp-extract';


module.exports.extract = function(hash){
  return through2.obj(function(file, enc, callback) {
      
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return callback();
    }

    try { 
      var name = path.basename(file.path, file.extname);  
      hash[name] = file.contents.toString();
    }
    catch (err) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, err, {
        fileName: file.path
      }));
      return callback();
    }

    callback(null, file);
  });
};