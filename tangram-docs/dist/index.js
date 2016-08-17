import yaml from 'js-yaml';

import TANGRAM_DOCS from './tangram-api.json';

export function match (address) {
    let currentTree = TANGRAM_DOCS.parameters;
    let split = address.split(':');

    let partialAddress;
    let url = '';
    let currentNode;

    // Iterate through each level of the tree until we find the right parameter node
    for (let i = 0; i < split.length; i++) {
        // Construct a partial address for each child in the tree
        if (i === 0) {
            partialAddress = split[0];
        }
        else {
            partialAddress = partialAddress + ':' + split[i];
        }

        let found;

        // On each level of the tree, check all nodes
        for (let node of currentTree) {
            found = partialAddress.match(node.address);

            if (found !== null) {
                currentNode = node;
                currentTree = node.children;

                // Construct the url that contains the documentation for a particular parameter
                // This is what we will render in our HTML
                if (url === '') {
                    url = currentNode.name;
                }
                else {
                    url = url + '/' + currentNode.name;
                }

                break;
            }
        }

        // Check if the address is completely invalid - it doesn't really exist in the tree
        // If we never found a matching node and we are at the last level of the tree (the leaves)
        if (found === null && i === (split.length - 1)) {
            url = '';
        }
    }

    return url;
}

export function getParameter (address) {
    let parameter = match(address);

    let base_dir = '../documentation/';
    let final_dir = base_dir + parameter + '.yaml';
    console.log(final_dir);
    // console.log(file1);



    // fs.readFile( '../documentation/sources/_source-name/url.yaml', function (err, data) {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log(data.toString());
    // });

    // require([final_dir], function (modValue) {
    //     console.log("inside here");
    //         //module now loaded.
    // });

    // var doc = yaml.safeLoad(fs.readFileSync([final_dir], 'utf8'));
    // console.log(doc);
}
