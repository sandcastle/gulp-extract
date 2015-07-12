/* global describe, it */
'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var gulp = require('gulp');
var extract = require('../');

describe('gulp_extract', function(){
    
    it('should hash all src files', function(done){
        var hash = {};
		return gulp.src(getPath('*'))
			.pipe(extract(hash))
            .on('finish', function() {
                [ 'one', 'two' ].forEach(function(name){
                    assert(hash[name]);
                    assert.equal(hash[name], fs.readFileSync(getPath(name)));
                });
                done();
            });
    });
    
    function getPath(name){
        return path.join(__dirname, '/fixture/' + name + '.txt');
    }
});