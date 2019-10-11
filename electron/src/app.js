const
	fs = require('fs');
	path = require('path'),
	{
	    app,
	    BrowserWindow,
		Menu,
		MenuItem,
	} = require('electron');

//set up the file system
//const
//	data = 'data';
//	//db = path.join(data, `db.json`),
//
//if (!fs.existsSync(data)) fs.mkdirSync(data);
//[
//	db,
//].forEach(db => {if (!fs.existsSync(db)) fs.writeFileSync(db, /*`{}` or `[]`*/);});

function createWindow() {
    let win = new BrowserWindow({
		title: `TITLE`,
        width: 1900,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    //win.removeMenu();
    win.loadFile(path.join('win', 'index.html'));
    win.webContents.on('before-input-event', (event, input) => {
        switch (input.type) {
            case 'keyDown':
                switch (input.key) {
                    case 'F12':
                        win.webContents.toggleDevTools();
						//win.webContents.addWorkSpace(__dirname); // keep
						break;
                    case 'F5':
						win.webContents.reload();
                } break;
        }
    });

	win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
		callback({responseHeaders: Object.fromEntries(Object.entries(details.responseHeaders).filter(header => !/x-frame-options/i.test(header[0])))});
	});
}

app.on('ready', createWindow);
