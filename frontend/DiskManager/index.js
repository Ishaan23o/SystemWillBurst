const { app, BrowserWindow } = require('electron')
let win;
const createWindow = () => {
    win = new BrowserWindow({
        width: 1150,
        height: 750,
        webPreferences: {
            nodeIntegration: true,
            allowRendererProcessReuse: true
        },
        resizable: false
    })

    win.loadFile('index.html')
}
app.whenReady().then(() => {
    createWindow()
})
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        event.preventDefault();
        win.loadURL(navigationUrl);
    });
});
