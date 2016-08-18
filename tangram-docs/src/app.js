'use strict';

var fs = require('fs');
var yaml = require('js-yaml');

var object;

function retrieveSceneFile () {
    console.log("Adding first level scene node to tree...", "\n");
    let sceneFilePath = '../../documentation/scene.yaml'
    let sceneFile = fs.readFileSync(sceneFilePath, 'ascii');
    let sceneFileYaml = yaml.safeLoad(sceneFile);
    object = sceneFileYaml.parameter;
}

function buildDocsTree () {
    let first_path = '../../documentation/';

    console.log("Recursively iterating through the tree...", "\n")
    object = recursiveAdd(object, first_path);

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

retrieveSceneFile();
buildDocsTree();
