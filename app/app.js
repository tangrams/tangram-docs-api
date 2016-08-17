let TANGRAM = data.parameters;

// User input: address to lookup
let hash = window.location.hash;
hash = hash.replace(/[#]/g,'');

// Div to replace url result with
let el = document.getElementById('lookup');

if (hash) {
    console.log(hash);
    let url = match(hash);
    el.innerHTML = url;
}
else {
    el.innerHTML = '';
}

function match (address) {
    let currentTree = TANGRAM;
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
