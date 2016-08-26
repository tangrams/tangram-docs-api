# Tangram Documentation Library

NPM library Prototype: [https://www.npmjs.com/package/tangram-docs](https://www.npmjs.com/package/tangram-docs)

## Documentation folder

Contains the yaml files that specify information for each Tangram parameter

## Tangram-docs folder

This is where our library lives.

The `source/app.js` file contains a script that has to be run to generate the `dist/tangram-docs.json` file. To run simply type:

`node app.js`

The script will crawl through the `documentation/` folder and generate a .json file based on all the Tangram parameter specs.

The `dist/` folder contains library functions to interact and fetch information from the .json file. 
