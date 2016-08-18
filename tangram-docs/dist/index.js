let TreeModel = require('tree-model');
let tree = new TreeModel();

let TANGRAM_DOCS = require('./tangram-docs.json');

let root = tree.parse(TANGRAM_DOCS);

// Find the first node that matches a predicate
// The predicate in this case is matching a node by 'name'
function findByName (name) {
    let node = root.first(function (node) {
        return node.model.name === name;
    });

    return node.model;
}

function findAllNodesMatchRegex(address) {
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

export function findNode (address) {
    let allMatchingNodes = findAllNodesMatchRegex(address);

    if (allMatchingNodes.length === 0) {
        return null;
    }
    else {
        return allMatchingNodes[0].model;
    }

}
