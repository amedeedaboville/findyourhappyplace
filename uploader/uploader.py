import MySQLdb
import fileinput

#db = MySQLdb.connect(host="", # your host, usually localhost
#        user="john", # your username
#        passwd="megajonhy", # your password
#        db="jonhydb") # name of the data base

#cur = db.cursor() 

for line in fileinput.input():
    print line
    #happiness = right_alpha - left_alpha
    geolat  = 45.5000
    geolong = 73.5667
    print 'cur.execute("INSERT INTO data (user_id, geolat, geolong, happiness, date_time) %( %d, %f, %f, %f, %s) " '
    #%(1, geolat, geolong, happiness, time))
