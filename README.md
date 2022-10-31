# copyall.js

Goes throught source folder + subfolders and copies all files into destination

```cmd
node copyall.js sourceFolder destinationFolder
```

<br/>  
# rename.js

Goes throught all files in source folder which match `/([0-9]{1,2})[a-zA-Z]*([0-9]{1,2})/` and renames them into `someName**x**` (new name must consist of double __**__, which will be replaced by found numbers)

```cmd
node rename.js sourceFolder someName**x**
```
