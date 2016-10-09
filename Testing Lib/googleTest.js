var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAE6o3bNueg57_Ij5oK3oTqd40R0nac5No'

});
/*
googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
	}
});*/
var directions_result = ;

googleMapsClient.directions({
	origins: [42.339006, -83.048530],
	destinations: [42.326339, -83.049710],
	mode: "walking",
	alternatives: true
}, function(err, response) {
	if (!err) {
		directions_result = JSON.parse(response.json.results);
	}
});

console.log(directions_result);