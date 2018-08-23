[![Cyclopt rating](https://qaas.cyclopt.com/api/projects/5af58bbb718d390004e0feb8/badge)](https://qaas.cyclopt.com)
![Coverage](https://github.com/cyclopt/jssa/blob/master/badge-lines.svg)

# jssa
> JS static analyzer (jssa): An aggregation of javascript source code static analysis tools

## Installation
In order to install `jssa`:
```sh
npm install jssa
```

## Usage
In order to use `jssa` in your project follow the steps:
1. Instert `jssa` in your code
```javascript
$ const jssa = require('jssa');
```
2. Analyze js code
```javascript
var project_root_directory = "example_project_to_analyze";
var list_of_js_files = [ 'example_project/app.js',
  'example_project/appcopy.js',
  'example_project/sonarjs.js',
  'example_project/routes/index.js',
  'example_project/routes/users.js' ]

jssa.analyze_all(project_root_directory, list_of_js_files).then(res => {
  analysis_results = res; // Object containing the analysis results
})
.catch(err => {
  console.log(err); // Print error 
});
```

## Test

The example_project folder contains a project created using `express-generator`. 

The file `appcopy.js` was added to be caught by `jsinspect`. In the `package.json` one extra vulnerable package was added.

To run the tests:
```sh
npm test
```

## Publish steps

(useful for maintainers)