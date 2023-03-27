

## Getting Started

To run the game on your own machine, first clone this repository and then execute the following commands in the terminal

### Server

Change directory into the server directory, install the server dependencies, seed the MongoDB database and run express:
```
cd server
npm install
npm run seeds
npm run server:dev
```

### Client

Open the client directory in a new terminal tab, install the server dependencies and run the application:
```
cd ../client
npm install
npm start
```

Your browser should automatically open with the application. If this doesn't happen, type http://localhost:3000/ into the address bar and hit enter.

Happy gaming!