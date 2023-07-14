const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Serve static files from the "public" directory
app.use(express.static("public"));

// Route handler for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket.io connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat message event
  socket.on("chat message", (message) => {
    console.log("Message:", message);
    io.emit("chat message", message); // Broadcast the message to all connected clients
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
