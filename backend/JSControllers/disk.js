const child = require('child_process');
const disk = require('diskusage');

//Retrieve the free and available space for a specific directory.
const getSpecificSpace = (drive) => {
    return disk.checkSync(drive);
}

//retrieve all drives in the system.
const allSpaces = () => {
    return child.execSync('wmic logicaldisk get name');
}

module.exports = {
    getSpecificSpace, allSpaces
}