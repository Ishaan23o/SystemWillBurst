//Require modules needed
const fs = require("fs");
const path = require('path');
//This function returns a list of files and folders inside a directory given by directoryPath.
function getFilesAndFoldersSync(directoryPath) {
    try {
        const Everything = fs.readdirSync(directoryPath);
        const files = [];
        const folders = [];
        for (const content of Everything) {

            const contentPath = path.join(directoryPath, content);
            try {
                const stats = fs.statSync(contentPath);
                if (stats.isFile()) {
                    files.push(contentPath);
                } else if (stats.isDirectory()) {
                    folders.push(contentPath);
                }
            } catch {

            }
        }
        folders.map(elem => elem + '\\');
        return {
            files,
            folders,
        };
    } catch (err) {
        console.error('Error reading directory contents:', err.message);
        return {
            files: [],
            folders: [],
        };
    }
}

//This function retrieves all files inlcuding the subdirectories 
function allFilesSync(directoryPath, maxSizeInBytes) {
    try {
        const allFiles = [];
        //This function goes inside the current directory and checks the file size and recursively checks for the subdirectories.
        function traverseDirectorySync(currentPath) {
            const Everything = fs.readdirSync(currentPath);
            for (const file of Everything) {
                try {
                    const filePath = path.join(currentPath, file);
                    const stats = fs.statSync(filePath);
                    //If a file.
                    if (stats.isFile()) {
                        allFiles.push({
                            filePath,
                            size: stats.size,
                        });
                        //If it is a directory.
                    } else if (stats.isDirectory()) {
                        traverseDirectorySync(filePath);
                    }
                } catch {
                }
            }
        }
        traverseDirectorySync(directoryPath);
        return allFiles;
    } catch (err) {
        console.error('Error identifying large files:', err);
        return [];
    }
};

//Retrieves a list of files inside a directory with a specific extension
function findFilesByExtensionSync(directoryPath, extension) {
    try {
        const files = allFilesSync(directoryPath);
        let filesWithExtension = files.filter((file) =>
            path.extname(file.filePath).toLowerCase() === extension.toLowerCase()
        );
        filesWithExtension = filesWithExtension.map((file) => file.filePath);
        for (let k in filesWithExtension) {
            filesWithExtension[k] = {
                filePath: filesWithExtension[k],
                size: fs.statSync(`${filesWithExtension[k]}`).size
            }
        }
        return filesWithExtension;
    } catch (err) {
        console.error('Error finding files by extension:', err);
        return [];
    }
}

module.exports = {
    findFilesByExtensionSync, allFilesSync, getFilesAndFoldersSync
}