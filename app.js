const express = require("express");
const app = express();
const port = 8000;

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const user_router = require("./routes/user");
app.use("/", user_router);
const users = { all: "전체" };
io.on("connection", (socket) => {
  socket.on("enter", (msg) => {
    users[socket.id] = msg;
    io.emit("notice", `${users[socket.id]}님이 입장하셨습니다.`);
    io.emit("users", users);
  });

  socket.on("chat message", (data) => {
    if (data.id === "all") {
      socket.broadcast.emit("chat message", {
        id: users[socket.id],
        msg: data.msg,
        type: "all",
      });
    } else {
      io.to(data.id).emit("chat message", {
        id: users[socket.id],
        msg: data.msg,
        type: "to",
      });
    }
  });

  socket.on("disconnect", () => {
    io.emit("notice", `${users[socket.id]}님이 퇴장하셨습니다.`);
    delete users[socket.id];
    io.emit("users", users);
  });
});

http.listen(port, () => {
  console.log("Server Port : ", port);
});
