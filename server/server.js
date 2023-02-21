const { createClient } =require('redis') ;
const { channel } = require('diagnostics_channel');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const client = createClient();
client.on('error', err => console.log('Redis Client Error', err));

const connecttoRedis=async()=>{
  await client.connect();
}
connecttoRedis();
const channel1 = 'chan1nel';

const sendDatatoServer = async(data)=>{

await client.publish(channel1, data);
console.log(`publishing message on ${channel1}`);

}

const io = new Server(server,{
  serveClient: false,
  cors: {
    origin: '*'
  }
});

const Listener=(socket,channell)=>{
  socket.on(channell, data=>{
    console.log(data);
    
  })
}


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log("socket id:",socket.id);

  Listener(socket,"socket2");
  socket.on("socket1", (data,ack)=>{
    console.log(data);
    sendDatatoServer(data);
    ack('this is from server')
  })
  
  socket.on("text-comming", data=>{
    console.log(data);
    sendDatatoServer(data);
  })

  socket.on("socket2join",()=>{
    socket.join("someroom")
  })
  socket.on("socket3", ()=>{
    console.log("socket 3 trigered")
    io.to("someroom").emit("hehehaha","hehehhahaaa");
  })
});


server.listen(9002, () => {
  console.log('listening on *:9002');
});