# jssa
> JS static analyzer (jssa): An aggregation of javascript source code static analysis tools


## Local Installation
In order to install `jssa` locally:
1. Clone the repository `cyclopt/jssa` using the following command:
```sh
$ git clone https://github.com/cyclopt/jssa.git
```
2. Move to the `cyclopt/jssa` root directory and install the dependencies using the command:
```sh
$ npm install
```

## Usage
In order to use `jssa` in your project follow the steps:
1. Install `jssa` as dependency in your project using the following command:
```sh
$ npm install path_to_jssa_root_directory
```
2. Instert `jssa` in your code
```javascript
$ const jssa = require('jssa');
```
3. Analyze js code
```javascript
var project_root_directory = "sample_project_to_analyze";
var list_of_js_files = ["sample_project/file_1.js", "sample_project/file_2.js"];

jssa.analyze_all(project_root_directory, list_of_js_files, "WINDOWS").then(res => {
  analysis_results = res; // JSON Object Containing the analysis results
})
.catch(err => {
  console.log(err); // Print error 
});
```