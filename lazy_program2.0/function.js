const { ipcRenderer } = require('electron');
const fs = require('fs');

// function updateClock() {
    //     const now = new Date();
    //     const year = now.getFullYear();
    //     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //     const month = monthNames[now.getMonth()];
    //     const date = String(now.getDate()).padStart(2, '0');
    //     const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
    //     document.getElementById('date').innerHTML = `<p>${day}</p><p><span>${date}</span></p><p>${month}</p>`;
    //     let hours = now.getHours();
    //     const minutes = String(now.getMinutes()).padStart(2, '0');
    //     const seconds = String(now.getSeconds()).padStart(2, '0');
    //     const ampm = hours >= 12 ? 'PM' : 'AM';
    //     hours = hours % 12;
    //     hours = hours ? hours : 12; // the hour '0' should be '12'
    //     const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    //     document.getElementById('clock').innerHTML = timeString;
    // }
    
    // setInterval(updateClock, 1000);
    // updateClock(); // Initial call to display the clock immediately
    function updateClock() {
        var now = new Date();
        var dname = now.getDay(),
            mo = now.getMonth(),
            dnum = now.getDate(),
            yr = now.getFullYear(),
            h = now.getHours(),
            m = now.getMinutes(),
            s = now.getSeconds(),
            pe = "AM";
            
            if (h == 0) {
            h = 12;
        }
        if (h > 12) {
            h = h - 12;
            pe = "PM";
        } 
        
        Number.prototype.pad = function(digits) {
            var n = this.toString();
            while (n.length < digits) {
                n = '0' + n;
            }
            return n;
        }
    
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                      "Oct", "Nov", "Dec"];
        var week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var ids = ["day", "month", "date", "year", "hour", "min", "sec", "period"];
        var values = [week[dname], months[mo], dnum.pad(2), yr, h.pad(2), m.pad(2), s.pad(2), pe];
        for (var i = 0; i < ids.length; i++) {
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }
    }
    
    function initClock() {
        updateClock();
        window.setInterval(updateClock, 1000);
    }
    
document.addEventListener('DOMContentLoaded', () => {
    //open 42 profile
    document.getElementById('open-profile').addEventListener('click', () => {
        ipcRenderer.send('open-link', 'https://profile.intra.42.fr/');
    });

    //open locate peer
    document.getElementById('open-locate').addEventListener('click', () => {
        ipcRenderer.send('open-link', 'https://locatepeer.vercel.app/');
    });

    document.getElementById('open-chatgpt').addEventListener('click', () => {
        ipcRenderer.send('open-link', 'https://chatgpt.com/');
    });

    document.getElementById('open-gemini').addEventListener('click', () => {
        ipcRenderer.send('open-link', 'https://gemini.google.com/app');
    });

    //open youtube
    document.getElementById('open-youtube').addEventListener('click', () => {
        ipcRenderer.send('open-link', 'https://www.youtube.com/');
    });

    //open github
    document.getElementById('open-github').addEventListener('click', () => {
        ipcRenderer.send('open-link', 'https://github.com/');
    });

    //open notion
    document.getElementById('open-notion').addEventListener('click', () => {
        ipcRenderer.send('open-link', 'https://www.notion.so/Dashboard-48e25153b86d41c69c2376fc1a4fceff');
    });

    //open discord
    document.getElementById('open-discord').addEventListener('click', () => {
        const discord_path = 'C:\\Users\\Dell\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Discord Inc\\Discord.lnk';
        fs.access(discord_path, fs.constants.F_OK, (err) => {
            if (err) {
                ipcRenderer.send('open-link', 'https://discord.com/');
            }
            else {
                ipcRenderer.send('open-program', discord_path);
            }
        });
    });

    //open steam
    document.getElementById('open-steam').addEventListener('click', () => {
        ipcRenderer.send('open-program', 'C:\\Users\\Dell\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Steam\\Steam.lnk');
    });
});