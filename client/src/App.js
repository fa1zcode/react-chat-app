import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001"); // connect to this back-end socket.io server

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };

  return (
    <div className="App">
      <h3>Join a Room</h3>
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      ></input>
      <input
        type="text"
        placeholder="Room ID"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      ></input>
      <button onClick={joinRoom}>Join a Room</button>

      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
