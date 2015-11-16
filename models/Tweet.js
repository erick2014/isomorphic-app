//include mongose module
const mongoose=require('mongoose');

//create a new schema for out tweet data
var twitterSchema=new mongoose.Schema({
	twid			:String,
	active		:Boolean,
	author		:String,
	avatar		:String,
	body			:String,
	date			:Date,
	screenName:String
})

// Create a static getTweets method to return tweet data from the db
twitterSchema.statics.getTweets = function(page, skip, callback) {

  var tweets = [],
      start = (page * 10) + (skip * 1);

  // Query the db, using skip and limit to achieve page chunks
  //Tweet
  this
  .find(
  	{},
  	'twid active author avatar body date screenName',
  	{skip: start, limit: 10}
  )
  .sort({date: 'desc'})
  .exec(
  	function(err,docs){
			// If everything is cool...
	    if(!err) {
	      tweets = docs;  // We got tweets
	      tweets.forEach(function(tweet){
	        tweet.active = true; // Set them to active
	      });
	    }

    	// Pass them back to the specified callback
    	callback(tweets);
  });

};

//create the model
Tweet=mongoose.model('Tweet',twitterSchema);
//export the model
module.exports=Tweet;