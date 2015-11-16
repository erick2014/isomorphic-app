var Tweet=require("../models/Tweet");

module.exports=function(stream,io){
	console.log("calling streamHandler");
	//when tweets get sent out way
	stream.on('data',function(data){
		//construct a new tweet object
		var tweet={
			twid			:data["id"],
			active		:false,
			author		:data["user"]["name"],
			avatar		:data["user"]["profie_image_url"],
			body			:data["text"],
			date			:data["created_at"],
			screenName:data["user"]["screen_name"]
		}

		//Create an instance from Tweet model
		var tweetModel=new Tweet(tweet);

		//save the tweet to the database
		tweetModel.save(function(err){
			//if there is not error do this
			if(!err){
				io.emit('tweet',tweet)
			}
		})

	})

}