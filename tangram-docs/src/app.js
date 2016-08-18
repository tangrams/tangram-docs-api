'use strict';

var fs = require('fs');
var yaml = require('js-yaml');
var path = require('path');
var walk = require('walk');
var walker = walk.walk('../../documentation');

// Root of the tree
var object = {
    name: 'scene',
    children: []
}

function flattenDocs () {
    console.log("Adding first level nodes to the tree...", "\n");
    walker.on('file', fileHandler);
    walker.on('end', endHandler);
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function fileHandler (root, fileStat, next) {
    let dir_file = path.resolve(root, fileStat.name);
    let check = 'documentation/scene/';
    let rel_path = dir_file.substring(dir_file.indexOf(check) + check.length);
    rel_path = rel_path.substring(0, rel_path.length - 5);
    let split = rel_path.split('/');

    fs.readFile(dir_file, 'ascii', function (err, data) {
        if (endsWith(fileStat.name, '.yaml')) {

            // Add only the first level of the tree (level 1, i.e. sources, camera, globals, etc.
            if (split.length === 1) {
                let firstNode = yaml.safeLoad(data);
                object.children.push(firstNode.parameter);
            }
        }

        next();
    });
}

function endHandler () {
    let first_path = '../../documentation/scene/';

    console.log("Recursively iterating through the tree...", "\n")
    for (let i = 0; i < object.children.length; i++) {
        object.children[i] = recursiveAdd(object.children[i], first_path);
    }

    writeJSON(object);
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

function writeJSON () {
    fs.writeFile('../dist/tangram-docs.json', JSON.stringify(object, null, 4), 'utf8', (err) => {
        if (err) {
            throw err;
        }
        else {
            console.log('JSON doc saved!');
        }
    });
}

flattenDocs();
