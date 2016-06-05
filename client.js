var net = require("net");
var client = net.connect({port: 9000}, function(){
    var data = "";
    var stdin = process.openStdin();
    stdin.addListener("data", function(data){
	    data = data.toString().substring(0, data.length-2);
	    if(data == "exit"){
	    	client.end();
	    	client.destroy();
	    	process.exit();
	    }
	    else{
	    	client.write(data);
	    }
	});
});
client.on('data', function(data) {
    console.log(data.toString());
});
client.on('end', function() {
    console.log('client disconnected');
});
client.on('error',function(err){
  console.log(err);
  process.exit();
});