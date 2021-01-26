console.log("Hello World!");
const PORT = 3000;
var express = require("express");
var app = express();
var IP = getMyIP() || "127.0.0.1";
var server = app.listen(PORT, IP, (_) =>
  console.log(`[SERVER STARTED] ${IP}: ${PORT}`)
);
app.use(express.static("PUBLIC"));
console.log(`[SITE ACTIVE]: PUBLIC`);

var io = require("socket.io")(server);
console.log(`[SOCKET INITIALISED]`);
console.log(getMyIP());
io.on("connection", newConnection);
let state = false;
function newConnection(socket) {
  console.log(`[USER CONNECTED]: ${socket.id}`);
  socket.on("trigger", function (data) {
    state = data.state;
    console.log(`[TRIGGER]: ${data.state}`);
    socket.broadcast.emit("update", {
      state: state,
    });
  });
}
function getMyIP() {
  // require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  //     return add
  // })

  const { networkInterfaces } = require("os");

  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }
  return results['Local Area Connection 4'][0]
}

// the home control stuff here
// var rpi = require('rpi-gpio')
// get all the availible pins
let availiblePins = [
  {
    id: 0,
    state: "button",
    value: false,
  },
];

/* Further things to do in Rpi
## npm install rpi-gpio
## var gpiop = require('rpi-gpio').promise;
 
gpiop.setup(7, gpiop.DIR_OUT)
    .then(() => {
        return gpiop.write(7, true)
    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })

*/