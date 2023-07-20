//Require modules needed
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const disk = require('./JSControllers/disk.js')
const filesNFolders = require('./JSControllers/filesAndFolders.js');
const duplicates = require('./JSControllers/duplicate.js');
const largeFiles = require('./JSControllers/largeFiles.js');
const deleteFiles = require('./JSControllers/delete.js')

//Middlewares we are using to communicate between our frontend and backend.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

//Threshold set by us for large files(100Mb).
const maxSizeInBytes = 100000000;

//API endpoint for checking duplicate files
app.delete("/deleteFiles", (req, res) => {
    res.send(deleteFiles.deleteFiles(req.body.arr));
})

//API endpoint for checking duplicate files
app.post("/getFilesByExtension", (req, res) => {
    res.send(filesNFolders.findFilesByExtensionSync(req.body.path, req.body.extension));
})

//API endpoint for find files by extension
app.post("/getDuplicateFiles", (req, res) => {
    res.send(duplicates.findDuplicateFilesSync(req.body.path));
})

//API endpoint for getting all files and folders
app.post("/getFilesFolders", (req, res) => {
    res.send(filesNFolders.getFilesAndFoldersSync(req.body.path));
}
);

//API endpoint for check large files request
app.post("/getLargeFiles", (req, res) => {
    res.send(largeFiles.identifyLargeFilesSync(req.body.path, maxSizeInBytes));
}
);

//API endpoint for getting all disks from the system.
app.get("/getDisks", (req, res) => {
    let y = disk.allSpaces();
    y = y.toString();
    //Convert buffer to string and split it.
    y = y.split('\r\r\n')
        .filter(value => /[A-Za-z]:/.test(value))
        .map(value => value.trim());
    //Convert it to gbs.
    for (let k in y) {
        y[k] = { ...disk.getSpecificSpace(y[k]), drive: y[k] };
        y[k].free /= Math.pow(2, 30);
        y[k].total /= Math.pow(2, 30);
    }
    res.status(200).json({ driveArr: y });
});

//Set up server to respond to frontend.
app.listen(6000, () => {
    console.log("DiskManager by SystemWillBurst is connected to port 6000");
});