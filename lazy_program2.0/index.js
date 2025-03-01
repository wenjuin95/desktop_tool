const { app, BrowserWindow, shell, ipcMain, screen } = require('electron');
const { exec } = require('child_process');

const createWindow = () => {
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const win = new BrowserWindow({
        width: 400,
        height: 300,
		title: '',
		resizable: false,
		minimizable: false,
		x: width - 400,
		y: 0,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('index.html');
    // win.webContents.openDevTools();

	win.setMenuBarVisibility(false);
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

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
        console.log(`stdout: ${stdout}`);
    });
});
