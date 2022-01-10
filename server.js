const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/donyardapp'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+ '/dist/donyardapp/index.html'));});
app.listen(process.env.PORT || 8080);


/////////////// Second Way of Deploying the Application /////////

// const express = require('express');
// const path = require('path');

// const app = express();


// // Serve only the static files from the dist directory
// app.use(express.static('./dist/donyard'));
//     app.get('/*', function(req, res) {
//         res.sendFile('index.html', {root: '/dist/donyard/'}
//     );
// });

// app.listen(process.env.PORT || 8080);

