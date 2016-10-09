#How google directions response works so we can interpret it
import googlemaps
from datetime import datetime
from pprint import pprint
import ujson as json

gmaps = googlemaps.Client(key='AIzaSyAE6o3bNueg57_Ij5oK3oTqd40R0nac5No')

geocode_result = gmaps.geocode('1600 Amphitheatre Parkway, Mountain View, CA')

reverse_geocode_result = gmaps.reverse_geocode((40.714224, -73.961452))

now = datetime.now()

directions_result = gmaps.directions("Boston, MA",
                                     "Somerville, MA",
                                     mode="walking",
                                     alternatives=True)
pprint(directions_result)
#print len(directions_result[0]["legs"])
##for i in xrange(len(directions_result)):
##    steps = directions_result[i]["legs"][0]["steps"]
##    for move in steps:
##        newLat, newLng = move["end_location"]['lat'], move["end_location"]['lng']
##        print newLat, newLng
##    print
##    print
##    print
##    
