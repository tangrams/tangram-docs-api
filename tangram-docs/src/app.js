'use strict';

var fs = require('fs');
var yaml = require('js-yaml');
var path = require('path');
var walk = require('walk');
var walker = walk.walk('../../documentation');

// var TreeModel = require('tree-model');
// var tree = new TreeModel();
// var root = tree.parse({ parameters: [] });

var object = {
    parameter: []
}

// function flattenDocs () {
//     walker.on('file', fileHandler);
//     walker.on('end', endHandler);
// }

/* Iterate through entire directory */
function fileHandler (root, fileStat, next) {
    let dir_file = path.resolve(root, fileStat.name);
    let check = 'documentation/parameters/';
    let rel_path = dir_file.substring(dir_file.indexOf(check) + check.length);
    rel_path = rel_path.substring(0, rel_path.length - 5);
    let split = rel_path.split('/');

    fs.readFile(dir_file, 'ascii', function (err, data) {
        if (endsWith(fileStat.name, '.yaml')) {
            var doc = yaml.safeLoad(data);
            addToMainObject(split, doc.parameter);
        }

        next();
    });
}

function endHandler () {
    writeJSON();
}

function endsWith (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function addToMainObject (split, nodeToAdd) {
    console.log("***********addding object***********");
    let level = split[0];
    let currentTreeLevel = object.parameters;

    // If the first level of the tree
    if (split.length === 1) {
        object.parameters.push(nodeToAdd);
    }
    // For all other levels we have to iterate through tree to find where to insert the node
    else {
        for (let i = 1; i < split.length; i++) {
            for (let node of currentTreeLevel) {
                // console.log(currentTreeLevel);
                if (node.name = split[i]) {
                    console.log(i);
                    console.log("match between", node.name, split[i]);
                    console.log(node);
                    console.log("\n\n");
                    currentTreeLevel = node;
                    break;
                    // console.log(node);
                    // console.log("\n\n");
                }
            }
        }

        currentTreeLevel.children.push(nodeToAdd);
    }
}

function writeJSON () {
    console.log("writing to JSON");
    fs.writeFile('tangram.json', JSON.stringify(object, null, 2), 'utf8', (err) => {
        if (err) {
            throw err;
        }
        else {
            console.log('JSON doc saved!');
        }
    });
}

// flattenDocs();

/************/

function flattenDocs2 () {
    walker.on('file', fileHandler2);
    walker.on('end', endHandler2);
}

function fileHandler2 (root, fileStat, next) {
    let dir_file = path.resolve(root, fileStat.name);
    let check = 'documentation/parameters/';
    let rel_path = dir_file.substring(dir_file.indexOf(check) + check.length);
    rel_path = rel_path.substring(0, rel_path.length - 5);
    let split = rel_path.split('/');

    fs.readFile(dir_file, 'ascii', function (err, data) {
        if (endsWith(fileStat.name, '.yaml')) {

            // Add only the first level of the tree (level 1, i.e. sources, camera, globals, etc.
            if (split.length === 1) {
                let firstNode = yaml.safeLoad(data);
                // console.log(firstNode);
                object.parameter.push(firstNode.parameter);
            }

            // console.log(split);
            // addToMainObject(split, doc.parameter);
        }

        next();
    });
}

function endHandler2 () {
    console.log("Adding children to the tree...");
    // console.log(object.parameter[1]);

    let first_path = '../../documentation/parameters/';

    for (let i = 0; i < object.parameter.length; i++) {
        object.parameter[i] = recursiveAdd(object.parameter[i], first_path);
    }

    // object.parameter = recursiveAdd(object.parameter[1], first_path);
    console.log("printing my object");
    console.log(object.parameter);
    writeJSON2(object);
}


function recursiveAdd (node, base_path) {
        let children = node.children;
        let base = base_path + node.name + '/';

        // Returning a node that has children
        // We have to call the function recursively
        if (children !== undefined) {
            for (let j = 0; j < children.length; j++) {
                let path = base + children[j] + '.yaml';
                let contents = fs.readFileSync(path, 'ascii');
                let yamlFile = yaml.safeLoad(contents);

                node.children[j] = recursiveAdd(yamlFile.parameter, base);
            }

            return node;
        }
        // Returning a leaf node
        else {
            return node;
        }
}

function writeJSON2 () {
    console.log("writing to JSON");
    fs.writeFile('tangram.json', JSON.stringify(object, null, 4), 'utf8', (err) => {
        if (err) {
            throw err;
        }
        else {
            console.log('JSON doc saved!');
        }
    });
}

flattenDocs2();
