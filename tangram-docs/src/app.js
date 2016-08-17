'use strict';

var fs = require('fs');
var yaml = require('js-yaml');
var path = require('path');
var walk = require('walk');
var walker = walk.walk("../../documentation");

var object = {
    parameters: []
}

function flattenDocs () {
    walker.on("file", fileHandler);
}

function fileHandler(root, fileStat, next) {
    let dir_file = path.resolve(root, fileStat.name);
    let check = 'documentation/parameters/';
    let rel_path = dir_file.substring(dir_file.indexOf(check) + check.length);
    rel_path = rel_path.substring(0, rel_path.length - 5);
    let split = rel_path.split('/');

    fs.readFile(dir_file, 'ascii', function (err, data) {
        if (endsWith(fileStat.name, '.yaml')) {
            // console.log(fileStat.name);
            console.log(split);
            console.log("\n");
            var doc = yaml.safeLoad(data);
            console.log(doc.parameter.name);
            // console.log(doc);
        }

        next();
    });
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

flattenDocs();
