# SystemWillBurst
System Requirements:
1) Visual Studio with Desktop Development C++ is installed.
2) Node js is installed.

Steps to Run(Requires node.js installed):
A. Clone the repository/copy the files in a folder.
A. Backend:
    1.Go to the backend directory.(cd backend in cmd prompt)
    2.In cmd lines enter npm install and wait for dependecies to be downloaded.
    3.Enter npm test to start the backend server on port 2000.
B. Frontend:
    1.Go to the frontend directory.
    2.In cmd lines enter npm install and wait for dependecies to be downloaded.
    3. Enter npm run start to start the frontend application interface. 

Features Implemented:
Essential - 
    1. Amount of free space available on the disk.
    2. Amount of disk space used by a disk.
    3. Deleting duplicate files either single or multiple even can include subdirectories.
    4. Identifying large files which have size greater then 100mb.
    5. Finding the files based on their extension.
    6. Faster deletion of files and folders(non-recursive).
    7. Allow users to find the files of similar types total size used by that type of files and deleting them.
Extra - 
    1. Deleting temporary OS files that are not currently in use.
    2. Finding the files that have not been used since last 90 days.
    3. Finding similar files using levenshtein distance. It shows files with >=90% similarity.
    
References:
    1. https://nodejs.org/api/crypto.html
    2. https://nodejs.org/api/fs.html
    3. https://www.geeksforgeeks.org/node-js-fs-statsync-method/
    4. https://www.npmjs.com/package/fast-levenshtein
    5. https://www.npmjs.com/package/diff-match-patch
    6. https://www.electronjs.org/docs/latest/
    7. https://nodejs.org/api/child_process.html
    8. https://www.npmjs.com/package/diskusage



    
    
