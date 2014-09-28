findyourhappyplace
==================

There is an interesting brainwave metric in the neuroscience literature that measures "positive affect".
Plainly, it looks at the difference of the alpha band between the left and the right side of the brain.

We use the Interaxon Muse to observe positive affect, and send the data to a phone with GPS location enabled.
Everywhere you go, this remembers your happiness at that place.
You can truly find your happy place.

And by aggregating everyone's data, we can build a map of the places people are the happiest. 

##Technical Structure

This is a big _hack_. There are many extraneous parts.

Essentially this is structured for two things: data collection and data visualization.

###Data Collection
Muse -(Bluetooth)> Laptop -(wifi/pure TCP)> Phone -(HTTP POST)> Server -> Database

Muse -> Laptop
Using muse-io from Interaxon. Sets up a server that broadcasts OSC messages on an open port

Laptop -> Phone (through LAN)
connect the phone to the computer, on port 5000

Phone uploads data to Mysql Database with a POST request to Server

Server inserts data in Mysql

Mysql has insert hooks that recomputes aggregates


###Data Visualizations
when a user goes to findmyhappyplace.com

Express.js is called to draw the page

it calls the database for the 'locations' table

it calls google maps to draw a heatmap

it also dynamically asks for more heatmap places as the map moves
