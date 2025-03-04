const { app, BrowserWindow, shell, ipcMain, screen } = require('electron');
const { exec } = require('child_process');
const os = require('os');

// Create window
const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize; // Get the screen size
    const win = new BrowserWindow({
        width: 390,
        height: 360,
        title: '',
        resizable: false, // Allow resizing
        minimizable: false, // Can't minimize the window
        titleBarStyle: 'hidden', // Hide the minimize, maximize, and close buttons
        x: width - 390,
        y: 0,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    win.loadFile('index.html'); // Load the HTML file
    // win.webContents.openDevTools(); // Open dev tools for debugging
};

// Ensure window is created when app is ready
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Close app when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// For opening links in the default browser
ipcMain.on('open-link', (event, url) => {
    shell.openExternal(url);
});

// For opening programs
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


// Open folder
ipcMain.on('open-folder', (event, folderPath) => {
    const platform = os.platform();
    let cmd;

    // Open folder based on platform
    if (platform === 'win32') {
        // For WSL paths, use wslview or the WSL.exe command
        if (folderPath.startsWith('/')) {
            cmd = `wsl.exe --exec xdg-open "${folderPath}"`;
        } else {
            cmd = `explorer.exe "${folderPath}"`;
        }
    } else if (platform === 'linux') {
        cmd = `xdg-open "${folderPath}"`;  // Correct command for Linux
    } else if (platform === 'darwin') {
        cmd = `open "${folderPath}"`;  // For macOS
    } else {
        console.error('Unsupported platform');
        return;
    }

    exec(cmd, (err) => {
        if (err) {
            console.error('Failed to open directory:', err);
            return;
        } else {
            console.log('Directory opened');
        }
    });
});

