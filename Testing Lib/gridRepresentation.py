maxLat = -1e999
maxLong = -1e999
minLat = 1e999
minLong = 1e999

with open("lastPoints.txt",'r') as fp:
    for line in fp:
        lat, lng = line.split()
        lat = float(lat)
        lng = float(lng)
        if 42 < lat < 43:
            if lat < minLat:
                minLat = lat
            elif lat > maxLat:
                maxLat = lat
        if -84 < lng < -82:
            if lng < minLong:
                minLong = lng
            elif lng > maxLong:
                maxLong = lng
