const express = require('express');
const {router:file_router} = require('./file_router.js');

const app = express();

app.use(file_router);

app.set("port", process.argv[2] || 3000);

app.listen(app.get('port'),()=>{
	console.log("listening on port "+app.get('port'));
});
