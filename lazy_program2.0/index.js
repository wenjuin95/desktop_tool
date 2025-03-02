const { app, BrowserWindow, shell, ipcMain, screen } = require('electron');
const { exec } = require('child_process');

//create window
const createWindow = () => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize; //get the screen size
    const win = new BrowserWindow({
        width: 380,
        height: 440,
		title: '',
		resizable: false, //can't resize the window
		minimizable: false, //can't minimize the window
        titleBarStyle: 'hidden', //hide the minimize, maximize and close buttons
		x: width - 380, 
		y: 0,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('index.html'); //load the html file
    // win.webContents.openDevTools(); //open dev tool for debug
};


//ensure window created when app is ready
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

//close app when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// for opening links in the default browser
ipcMain.on('open-link', (event, url) => {
    shell.openExternal(url);
});

// for opening programs
ipcMain.on('open-program', (event, program) => {
    exec(`"${program}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error opening program: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: SUCCESS ${stdout}`);
    });
});