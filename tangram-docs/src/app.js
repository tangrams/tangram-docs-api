'use strict';

var fs = require('fs');
var yaml = require('js-yaml');
var path = require('path');
var walk = require('walk');
var walker = walk.walk("../../documentation");

function flattenDocs () {
    // var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
    // console.log(doc.parameter);

    walker.on("file", fileHandler);
}

function fileHandler(root, fileStat, next) {
    let dir_file = path.resolve(root, fileStat.name);

    fs.readFile(dir_file, 'ascii', function (err, data) {
        // console.log(data);

        // var doc = yaml.load(data.toString());
        // console.log(doc);
        if (endsWith(fileStat.name, '.yaml')) {
            console.log(dir_file);
            var doc = yaml.safeLoad(data);
            console.log(doc);
        }
        next();
    });
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

flattenDocs();
