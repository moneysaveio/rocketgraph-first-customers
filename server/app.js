const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express(),
			DIST_DIR = __dirname,
			HTML_FILE = path.join(DIST_DIR, 'index.html')
app.use(express.static(__dirname));
// sendFile will go here
//passsing directoryPath and callback function
fs.readdir(DIST_DIR, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
    });
});
app.get('/', function(req, res) {
	res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})