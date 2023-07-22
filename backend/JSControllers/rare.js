const fs = require('fs');
const path = require('path');
const { getFilesAndFoldersSync } = require('./filesAndFolders');

function identifyInefficientFilesSync(directoryPath, thresholdDays) {
    try {
        const { files, folders } = getFilesAndFoldersSync(directoryPath);
        const currentTime = new Date().getTime();
        const thresholdTime = thresholdDays * 24 * 60 * 60 * 1000; // Convert days to milliseconds
        const inefficientFiles = [];
        for (const file of files) {
            const filePath = file;
            const stats = fs.statSync(filePath);
            const lastAccessTime = stats.atimeMs; // in milliseconds
            if (currentTime - lastAccessTime > thresholdTime) {
                inefficientFiles.push({
                    filePath,
                    lastAccessTime: new Date(lastAccessTime),
                });
            }
        }
        for (let k of folders) {
            let recurse = identifyInefficientFilesSync(k);
            for (x of recurse) inefficientFiles.push(x);
        }
        return inefficientFiles;
    } catch (err) {
        console.error('Error identifying inefficient files:', err);
        return [];
    }
}

module.exports = {
    identifyInefficientFilesSync
}