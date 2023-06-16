const cors = require("cors");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chatMessage", (data) => {
    console.log(data);
    io.emit("chatMessage", { user: data.user, text: data.data });
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});


http.listen(3000, () => {
  console.log("running on port 3000");
});