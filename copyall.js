const fs = require("fs");

// Copies everything from subfolders into one
// Usage:
// node copyall.js sourceFolder destinationFolder

const args = process.argv;
let sourceFolder = args[2];
let destFolder = args[3];
let filesCopied = 0;
let destName;

if(destFolder == undefined){
    destName = "";
} else {
    destName = (destFolder.match("/")) ? destFolder.slice(destFolder.lastIndexOf("/"), destFolder.length) + "/" : destFolder + "/";
}

function copyAll(source, dest){
    fs.readdirSync(source).forEach(function(file){
        if(fs.statSync(source + "/" + file).isDirectory()){
            copyAll(source + "/" + file, dest + "_" + file);
        } else {
            fs.copyFileSync(source + "/" + file, destName + dest.replace(destName + "_", "") + "_" + file);
            filesCopied++;
        }
    });
}

copyAll(sourceFolder, destFolder);
console.log("Copied " + filesCopied + " files");
