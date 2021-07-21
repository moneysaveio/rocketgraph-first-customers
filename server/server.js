const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express(),
			DIST_DIR = __dirname+'/public',
			HTML_FILE = DIST_DIR + '/public/index.html';
app.use(express.static(DIST_DIR));

app.get('/', function(req, res) {
	res.sendFile(HTML_FILE);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
