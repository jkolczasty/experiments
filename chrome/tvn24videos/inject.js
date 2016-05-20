function __inject()
{
	console.log("HELLO FROM INJECTED");
	console.log(vjs);
	test();
};

function test()
{
	var players=vjs.players;
	var keys=Object.keys(players);
	
	console.log("Players:");

	for(var k=0, l=keys.length; k<l; k++) {
		console.log("Player:", keys[k]);
	};
};