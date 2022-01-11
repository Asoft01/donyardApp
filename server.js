
///////////// Second Way of Deploying the Application /////////

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/donyardapp'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+ '/dist/donyardapp/index.html'));});
app.listen(process.env.PORT || 8080);



// const express = require('express');
// const path = require('path');

// const app = express();


// // Serve only the static files from the dist directory
// app.use(express.static('./dist/donyardapp'));
//     app.get('/*', function(req, res) {
//         res.sendFile('index.html', {root: '/dist/donyardapp/'}
//     );
// });

// app.listen(process.env.PORT || 8080);
