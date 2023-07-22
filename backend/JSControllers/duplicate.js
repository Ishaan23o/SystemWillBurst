//Require modules needed
const fs = require("fs");
const path = require('path');
const crypto = require('crypto');
const DiffMatchPatch = require('diff-match-patch').diff_match_patch;
const filesNFolders = require('./filesAndFolders.js')

//Create a hash of the file
function getFileChecksumSync(filePath) {
    //Set the algorithm for hashing
    const hash = crypto.createHash('md5');
    //Hash the data
    const data = fs.readFileSync(filePath);
    hash.update(data);
    //Convert to hexadecimal format.
    return hash.digest('hex');
}

//Retrieves all files inside the directories which are duplicates of each other.
function findDuplicateFilesSync(directoryPath) {
    try {
        let fileChecksums = {};
        //Get all files in current directory(Not including subdirectories because of large time complexity).
        const files = filesNFolders.getFilesAndFoldersSync(directoryPath).files;
        //Match checksum, extension and size.
        for (const filePath of files) {
            const fileMetaData = fs.statSync(filePath);
            let checksum = getFileChecksumSync(filePath);
            checksum += "_" + fileMetaData.size + "_" + path.extname(filePath).toLowerCase();
            if (!fileChecksums[checksum]) fileChecksums[checksum] = [];
            fileChecksums[checksum] = [...fileChecksums[checksum], filePath];
        }
        for (let key in fileChecksums) {
            if (fileChecksums[key].length <= 1) delete fileChecksums[key];
        }
        return fileChecksums;
    } catch (err) {
        console.error('Error detecting duplicate files:', err);
        return { message: "There was some error" };
    }
}

//Retrieves all files inside the directories which are duplicates of each other.
function findDuplicateFilesIncludeSync(directoryPath, curr = 0) {
    try {
        let fileChecksums = {};
        //Get all files in current directory( including subdirectories because of large time complexity).
        const { files, folders } = filesNFolders.getFilesAndFoldersSync(directoryPath);
        //Match checksum, extension and size.
        for (const filePath of files) {
            const fileMetaData = fs.statSync(filePath);
            let checksum = getFileChecksumSync(filePath);
            checksum += "_" + fileMetaData.size + "_" + path.extname(filePath).toLowerCase();
            if (!fileChecksums[checksum]) fileChecksums[checksum] = [];
            fileChecksums[checksum] = [...fileChecksums[checksum], filePath];
        }
        for (let folder of folders) {
            let x = findDuplicateFilesIncludeSync(folder, 1);
            for (let k in x) {
                for (let y of x[k]) {
                    if (!fileChecksums[k]) fileChecksums[k] = [];
                    fileChecksums[k] = [...fileChecksums[k], y];
                }
            }
        }
        if (!curr) {
            for (let key in fileChecksums) {
                if (fileChecksums[key].length <= 1) delete fileChecksums[key];
            }
        }
        return fileChecksums;
    } catch (err) {
        console.error('Error detecting duplicate files:', err);
        return { message: "There was some error" };
    }
}

//Retrieves all files inside the directories which are similarity of each other.
function findSimilarFilesSync(directoryPath) {
    const dmp = new DiffMatchPatch();
    const similarityThreshold = 0.90;
    try {
        const files = filesNFolders.getFilesAndFoldersSync(directoryPath).files;
        const similarFiles = [];

        for (let i = 0; i < files.length; i++) {
            const fileA = files[i];
            const textA = fs.readFileSync(fileA, 'utf-8')
            for (let j = i + 1; j < files.length; j++) {
                const fileB = files[j];
                const textB = fs.readFileSync(fileB, 'utf-8');
                const diffs = dmp.diff_main(textA, textB);
                const levenshteinDistance = dmp.diff_levenshtein(diffs);
                const similarity = 1 - levenshteinDistance / Math.max(textA.length, textB.length);
                if (similarity >= similarityThreshold) {
                    similarFiles.push({
                        fileA,
                        fileB,
                        similarity,
                    });
                }
            }
        }
        return similarFiles;
    } catch (err) {
        console.error('Error identifying similar files:', err);
        return [];
    }

}

module.exports = { findDuplicateFilesSync, getFileChecksumSync, findDuplicateFilesIncludeSync, findSimilarFilesSync }