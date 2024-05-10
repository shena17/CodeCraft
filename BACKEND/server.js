const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const ACTIONS = require("../frontend/src/Actions");

//Setting up the server
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8071;

app.use(cors());
app.use(express.json());

const tagsRouter = require("./routes/tags");
app.use("/tags", tagsRouter);
const forumsRouter = require('./routes/forums');
app.use('/forums', forumsRouter);
const resourcesRouter = require('./routes/resources');
app.use('/resources', resourcesRouter);
const tutorialsRouter = require('./routes/tutorials');
app.use('/tutorials', tutorialsRouter);

app.use("/tutorials", require("./routes/TutorialsUser"));
app.use("/resources", require("./routes/resourcesUser"));

//Setting up routing
app.use("/user", require("./routes/User"));
app.use("/ala", require("./routes/ALA"));
app.use("/note", require("./routes/Note"));
app.use("/mylist", require("./routes/MyList"));
app.use("/verification", require("./routes/Verification"));

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

const userSocketMap = {};

function getAllConnectedClients(roomId) {
  //Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

//Socket.IO connection event
io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });

  socket.on("message", (msg) => {
    console.log("Received message:", msg);
    io.emit("message", msg); // Broadcast the message to all connected clients
  });
});

//Start the HTTP server
server.listen(PORT, () => {
  console.log("Server up with port : " + PORT);
});
