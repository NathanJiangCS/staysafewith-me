var fs = require('fs');
//Require the following:
//Important! Input the proper dataPath parameter. Locate result.txt's file path
function float2int (value) {
    return value | 0;
}

//To use:
//var riskGrid = populateRisk("result.txt");
//Run before dangerTest.js

//Main functionality. Takes in path to data file with crime locations. Outputs a grid representation.
function populateRisk (dataPath) {
	//console.log(riskGrid.length, riskGrid[0].length);
	var a, b;
	//var total = 0;
	var pair;
	var zeros = Array.apply(null, Array(10000)).map(Number.prototype.valueOf, 0);
	var riskGrid = zeros.map(function(i) {
	    return zeros.slice();
	});
	/*
	readline.createInterface({
	    input: fs.createReadStream(dataPath),
	    terminal: false
	}).on('line', function(line) {
	   var array = line.split(' '),

	   a = Math.abs(float2int(parseFloat(array[0])*10000)) -828638;
	   b = float2int(parseFloat(array[1])*10000) - 420951;

	   if (a >= 0 && a < 10000){ //a is longitude, b is latitude
	   		if (b >= 0 && b < 10000){
	   			try {
	   				for (i = a-5; i < a+5; i++){
	   					for (j = b-5; j< b+5; j++){
	   						riskGrid[i][j] += 1;
	   					}
	   				}
	   				riskGrid[a][b] += 1;
	   				//console.log(a,b);

	   			} catch (err) {
            		console.log("Error: " + err);
	   				console.log( a, b);
	   			}
	   		}
	   }

	   //console.log( b);
	});
	*/


	fs.readFile(dataPath, function(err, data) {
    	if(err) throw err;
    	var array = data.toString().split("\n");
    	for(i in array) {
        	//console.log(array[i]);
        	pair = array[i].split(' ');
        	//console.log(pair);
			a = Math.abs(float2int(parseFloat(pair[0])*10000)) -828638 , b = float2int(parseFloat(pair[1])*10000) - 420951;
			//console.log(a,b);
			if (a >= 0 && a < 10000){ //a is longitude, b is latitude
				if (b >= 0 && b < 10000){
					try {
						for (j = a-50; i < a+50; i++){
							for (k = b-50; j< b+50; j++){
								riskGrid[j][k] += 1;
							}
						}
						riskGrid[a][b] += 1;
						//console.log(a,b);
					}
					catch (err) {
						console.log(err);
						console.log( a, b);
					}
				}
			}


    	}
	});
  return riskGrid;
}

//export.float2int = float2int;
module.exports = populateRisk;
