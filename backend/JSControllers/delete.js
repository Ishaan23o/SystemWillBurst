const path = require('path');
const fs = require('fs');
const child = require('child_process');
const { getFilesAndFoldersSync } = require('./filesAndFolders');

//Delete all selected files
const deleteFiles = (arr) => {
    try {
        for (let filepath of arr) {
            child.execSync('del "' + filepath + '"');
        }
        return true;
    } catch (err) {
        console.log("Error while deleting files " + err);
        return false;
    }
}

//Delete all selected folders
const deleteFolders = (arr) => {
    try {
        for (let folderpath of arr) {
            fs.rmSync(folderpath, { recursive: true, force: true });
        }
        return true;
    } catch (err) {
        console.log("Error while deleting folders " + err);
        return false;
    }
}

//Delete all selected folders
const deleteTemporaryFolders = (arr) => {
    try {
        const { files, folders } = getFilesAndFoldersSync(arr[0]);
        for (let folderpath of folders) {
            try {
                fs.rmSync(folderpath, {recursive:true, force: true });
            } catch (err) {
                console.log(err);
            }
        }
        for (let filepath of files) {
            try {
                fs.rmSync(filepath, { recursive:true,force: true });
            } catch (err) {
                console.log(err);
            }
        }
        return true;
    } catch (err) {
        console.log("Error while deleting temporary folders " + err);
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
    deleteFiles, deleteFilesByExtension, deleteFolders, deleteTemporaryFolders
}

