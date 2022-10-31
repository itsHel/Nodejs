const fs = require("fs");

// Made to rename episodes into same format
// 
// Usage:
// node rename.js sourceFolder someName**x**

const args = process.argv;
let source = args[2];
let newName = args[3];
let filesEdited = 0;

if(!newName.match(/\*\*.*\*\*/)){
    console.log("New name must consist of double '**'");
    return;
}

function renameAll(source){
    fs.readdirSync(source).forEach(function(file){
        let temp = file.split(".");
        let ext = temp[temp.length - 1];
        let fileNoExt = file.replace(ext, "");
        let match = fileNoExt.match(/([0-9]{1,2})[a-zA-Z]*([0-9]{1,2})/);
        
        if(match.length != 3){
            console.log("Error on: " + file);
            return;
        }
            
        let tempName = newName.replace("**", match[1]).replace("**", match[2]);
        fs.rename(source + "/" + file, source + "/" + tempName + "." + ext, ()=>{});
        filesEdited++;
    });
}

renameAll(source)
console.log("Edited " + filesEdited + " files");
