const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const {Server} = require('socket.io');
const http = require("http");

//Setting up the server
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8071;

app.use(cors());
app.use(express.json());

//Setting up routing
app.use("/user", require("./routes/User"));

//Create HTTP server
const server = http.createServer(app);

//Setting up the database connection
const URL = process.env.MONGODB_URL;

mongoose.set("strictQuery", true);
mongoose.connect(URL, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully!");
});

//Create Socket.IO server
const io = new Server(server);

//Socket.IO connection event
io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);
})

//Start the HTTP server
server.listen(PORT, () => {
  console.log("Server up with port : " + PORT);
});

