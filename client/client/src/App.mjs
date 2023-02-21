import './App.css';
import{useState} from "react"
import { io } from "socket.io-client";


function App() {
  const socket = io("http://localhost:9002");
  socket.on("data-comming", (datacoming)=>{
    console.log(datacoming);
  });
  socket.on("hehehaha", (data)=>{
    console.log(data);
  });

// client-side
//socket with ack
function socketHandlers1 ()  {
  socket.emit("socket1", "dapat data dari socket 1",(response)=>{
    console.log(response)
  });
}
//socket with 2 arg
function socketHandlers2 ()  {
  socket.emit("socket2","dapat data dari socket 2","params");
}
//using socket room
function socketHandlers3 ()  {
  socket.emit("socket2join");
}
function socketHandlers4 ()  {
  socket.emit("socket3","dapat data dari socket 3");
}


  return (
    <div className="App">
        <button onClick={socketHandlers1}>Socket 1</button>
        <button onClick={socketHandlers2}>Socket 2</button>
        <button onClick={socketHandlers3}>Socket join 2</button>
        <button onClick={socketHandlers4}>Socket 3</button>
    </div>
  );
  }

export default App;
