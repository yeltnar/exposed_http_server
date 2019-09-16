const express = require('express');
var bodyParser = require('body-parser')
var fs = require('fs')
var https = require('https')

const PORT = 3000;

const {router:file_router} = require('./file_router.js');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
	if( req.secure===false ){
		return res.json({"err":"https only"});
	}else{
		return next();
	}
});

app.use(file_router);

app.set("port", process.argv[2] || PORT);

https.createServer({
	key: fs.readFileSync('./config/key/server.key'),
	cert: fs.readFileSync('./config/key/server.cert')
  }, app)
.listen(app.get('port'), function(){
	console.log(`Example app listening on port ${app.get('port')}! Go to https://localhost:${app.get('port')}/`)
});
