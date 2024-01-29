const express = require("express");

const path = require("path");

const http = require("http");

const app = express();

const server = http.createServer(app);

const bodyparser = require("body-parser");

require("dotenv").config();

const userRoutes = require("./routes/user");

const { Server } = require("socket.io");

const io = new Server(server);

const db = require("./database/database");

app.use(bodyparser.json({ extended: false }));

app.use(userRoutes);

//rendering frontend
app.use((req, res) => {
  if (req.url === "/") {
    res.sendFile(path.join(__dirname, `../Frontend/AllPosts/allPost.html`));
  } else {
    res.sendFile(path.join(__dirname, `../Frontend/${req.url}`));
  }
});

// making connection using socket.io
io.on("connection", (socket) => {
  
  //on comment
  socket.on("user-message", (details) => {
    socket.broadcast.emit("recieve-message", details);
  });  


  //on like
  socket.on("user-like", (count) => {
    socket.broadcast.emit("recieve-like", count);
  });
});


server.listen(3000);
