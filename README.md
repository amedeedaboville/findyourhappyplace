findyourhappyplace
==================
#Technical Structure

This is a big hack. There are extraneous parts.

Essentially this is structured for two things: data collection and data visualization.

###Data Collection
Muse -> Laptop
Using muse-io from Interaxon. Sets up a server that broadcasts OSC messages on an open port

Laptop -> Phone (through LAN)
connect the phone to the computer, on port 5000
Phone uploads data to Mysql Database with a POST request to Server
Server inserts data in Mysql

Mysql has insert hooks that recompute our aggregates


###Data Visualizations
when a user goes to findmyhappyplace.com

Express is called to draw the page

it calls the database for the 'locations' table
it calls google maps to draw a heatmap
it also dynamically asks for more heatmap places as the map moves
