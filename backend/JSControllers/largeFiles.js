//Require modules needed
const fs = require("fs");
const path = require('path');

//Retrieve a list of files which are >100mb in the directory given by directoryPath
function identifyLargeFilesSync(directoryPath, maxSizeInBytes) {
    try {
        const largeFiles = [];
        //This function goes inside the current directory and checks the file size and recursively checks for the subdirectories.
        function traverseDirectorySync(currentPath) {
            const Everything = fs.readdirSync(currentPath);
            for (const file of Everything) {
                const filePath = path.join(currentPath, file);
                const stats = fs.statSync(filePath);
                //If a file.
                if (stats.isFile() && stats.size > maxSizeInBytes) {
                    largeFiles.push({
                        filePath,
                        size: stats.size,
                    });
                    //If it is a directory.
                } else if (stats.isDirectory()) {
                    traverseDirectorySync(filePath);
                }
            }
        }
        traverseDirectorySync(directoryPath);
        return largeFiles;
    } catch (err) {
        console.error('Error identifying large files:', err);
        return [];
    }
};

module.exports = {
    identifyLargeFilesSync
}