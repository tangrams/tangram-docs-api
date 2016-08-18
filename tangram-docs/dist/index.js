'use strict';

/* Module exports */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findNode = findNode;

/* Functions */

let TreeModel = require('tree-model');
let TANGRAM_DOCS = require('./tangram-docs.json');

let tree = new TreeModel();
let root = tree.parse(TANGRAM_DOCS);

// Find the first node that matches a predicate
// The predicate in this case is matching a node by 'name'
function _findByName (name) {
    let node = root.first(function (node) {
        return node.model.name === name;
    });

    return node.model;
}

// Find all nodes that match the regex of a certain address in our docs tree
function _findAllNodesMatchRegex (address) {
    let node = root.all(function (node) {
        let found = null;

        if (node.model.address !== undefined) {
            found = address.match(node.model.address);
        }

        if (found !== null) {
            return true;
        }
        else {
            return false;
        }
    });

    return node;
}

function findNode (address) {
    let allMatchingNodes = _findAllNodesMatchRegex(address);

    if (allMatchingNodes.length === 0) {
        return null;
    }
    else {
        return allMatchingNodes[0].model;
    }
}
