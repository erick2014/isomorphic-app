const express=require("express");
const handleBars=require("express-handlebars");
const http=require('http');
const mongoose=require('mongoose');
const twitter=require('twitter');
const routes=require('./routes');
const config=require('./config');
const streamHandler=require('./utils/streamHandler');
const socktIo=require("socket.io");

//create an express instance 
var app=express();
//set the port
var port=process.env.PORT || 8080;

//set handlebars as the templating engine
app.engine('handlebars',handleBars({defaultLayout:'main'}));
//set template engine to expres framework
app.set('view engine','handlebars');

//Disable etag headers on responses
app.disable('etag');

//connect to our mongo database 
mongoose.connect('mongodb://localhost/react-tweets');

//root root route
app.get('/',routes.index);

//enable page route
app.get('/page/:page/:skip',routes.page);

//set /public as our static content dir
app.use("/",express.static(__dirname+"/public/"));

//fire our server up
var server=http.createServer(app).listen(port,function(){
	console.log("our server is running on port "+port)
})

//Initialize socket.io
var io=socktIo.listen(server);

//crete a new ntwitter instance
var twit=new twitter(config.twitter);

//Set a stream listener for tweets matching tracking keywords
twit.stream(
	'statuses/filter',
	{track:'scotch_io,#scotchio'},
	function(stream){
		streamHandler(stream,io);
	}
)