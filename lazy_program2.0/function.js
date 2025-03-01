const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
        document.getElementById('clock').textContent = timeString;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Initial call to display the clock immediately

    document.getElementById('open-youtube').addEventListener('click', () => {
        ipcRenderer.send('open-link', 'https://www.youtube.com/');
    });
    document.getElementById('open-discord').addEventListener('click', () => {
        ipcRenderer.send('open-program', 'C:\\Users\\wenjuin\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc\\Discord.lnk');
    });
    document.getElementById('open-steam').addEventListener('click', () => {
        ipcRenderer.send('open-program', 'C:\\Users\\wenjuin\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Steam\\Steam.lnk');
    });
});
