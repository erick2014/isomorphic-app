module.exports = {
	index:function(req,res){
		res.send("Welcome to my index page!");
	},
	page:function(req,res){
		console.log(req.params);
		res.send("Welcome to the page content!");
	}
}