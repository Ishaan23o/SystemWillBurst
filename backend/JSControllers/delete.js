
const child = require('child_process');

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
const deleteFilesByExtension = (extension) => {
    try {
        //let arr =
        for (let filepath of arr) {
            child.execSync('del ' + filepath);
        }
        return true;
    } catch (err) {
        console.log("Error while deleting files " + err);
        return false;
    }
}

module.exports = {
    deleteFiles, deleteFilesByExtension
}

