const fs = require("fs");

// Made to change enb weather files
// edit search and toAdd to overwrite values for particular matches in all ini files in this folder
//
// Usage:
// node enbchange.js

// AmbientLightingIntensityDawn=0.45

let filesEdited = 0;
const search = "AmbientLightingIntensity";
const toAdd = 0.11111;

function renameAll() {
    fs.readdirSync("./").forEach(function (filename) {
        let temp = filename.split(".");
        let edited = false;
        let ext = temp[temp.length - 1];
        if (ext != "ini") return;

        let text = fs
            .readFileSync(filename, "utf8", function (err) {
                console.log(err);
                console.log("```" + err.message + "```");
            })

            .toString()
            .split("\n")
            .map(function (line) {
                // console.log(line);
                if (line.match(search)) {
                    edited = true;
                    let temp = line.split("=");
                    let value = temp[1];
                    let newValue = parseFloat(value) + toAdd;
                    temp[1] = newValue;
                    return temp.join("=");
                }

                return line;
            })
            .join("\n");

        fs.writeFileSync(filename, text, function (err) {
            console.log(err);
            console.log("```" + err.message + "```");
        });

        //let tempName = newName.replace("**", match[1]).replace("**", match[2]);
        //fs.rename(source + "/" + file, source + "/" + tempName + "." + ext, ()=>{});
        if (edited) filesEdited++;
    });
}

renameAll();
console.log("Edited " + filesEdited + " files");
