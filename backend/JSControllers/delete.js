const path = require('path');

const child = require('child_process');
const { getFilesAndFoldersSync } = require('./filesAndFolders');

//Delete all selected files
const deleteFiles = (arr) => {
    try {
        for (let filepath of arr) {
            child.execSync('del ' + filepath);
        }
        return true;
    } catch (err) {
        console.log("Error while deleting files " + err);
        return false;
    }
}

//Delete all selected files
const deleteFilesByExtension = (directoryPath, extension) => {
    try {
        deleteFiles(getFilesAndFoldersSync(directoryPath).files.filter((file) =>
            path.extname(file).toLowerCase() === extension.toLowerCase()
        ))
        return true;
    } catch (err) {
        console.log("Error while deleting files " + err);
        return false;
    }
}

module.exports = {
    deleteFiles, deleteFilesByExtension
}

