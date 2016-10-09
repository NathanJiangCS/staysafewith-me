function dangerTest(directions_result, riskGrid){
	//pathObject = JSON.parse(directions_result);
  console.log("dangerTest");
  function float2int (value) {
      return value | 0;
  }

	var dangerLevel;
	var steps, newLat, newLng;
  
	if (directions_result.routes.length == 0){
    console.log(directions_result.routes);
		return [""];
	} else {
		var pathDangerLevel = [];
    console.log(directions_result.routes.length);
		for (i=0; i < directions_result.routes.length; i++){
			dangerLevel = 0;
			steps = directions_result.routes[i].legs[0].steps;
			for (j=0; j < steps.length; j++){
				newLat = steps[j].end_location.lat;
				newLng = steps[j].end_location.lng;
				newLng = Math.abs(float2int(newLng*10000))-828638;
				newLat = float2int(newLat*10000)-420951;
				if (0 <= newLat  && newLat< 10000){
					if (0 <= newLng && newLng < 10000){
						console.log(newLat, newLng);
						dangerLevel += riskGrid[newLng][newLat];
					}
				}

			}
			pathDangerLevel.push(dangerLevel);
		}
	return pathDangerLevel;
}
}

module.exports = dangerTest;
