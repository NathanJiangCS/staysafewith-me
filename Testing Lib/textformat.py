#with open("2016result.txt",'w') as outfile:
with open("lastPoints.txt",'w') as outfile:
    i = 0
    for line in reversed(open("result.txt", 'r').readlines()):
        text = line.rstrip()
        x,y = text.split()
#        formattedLine = "new google.maps.LatLng(%s, %s),\n" % (y, x)
        formattedLine = str(y) +' '+ str(x)+'\n'
        outfile.write(formattedLine)
        i += 1
        if i > 50000:
            break
        
