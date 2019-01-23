This is a website that is designed to help manage sprints and projects.

In order to run this you will need nodejs installed as well as a local mongodb instance running. Running the 'node index.js' command will launch the server which can be accessed at yourIP:3000.

The front folder could also be named public, it contains the front end. The index.html contains the header, navbar and is the basis for the SPA. angInit.js contains the routing for the SPA.

The models folder contains the database schemas. The models.js file brings them together and registers them using the wagner npm module.
