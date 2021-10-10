import io from 'socket.io-client';

let socket;
export const initiateSocket = (room) => {
  // socket = io('http://localhost:3000');
  socket = io('https://ws.pusanair-dev.xyz');

  console.log(`Connecting socket...`);
  return socket
  // if (socket && room) socket.emit('join', room);
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
}
export const subscribeToChat = (cb) => {
  if (!socket) return (true);
  socket.on('hello', tes => {
    console.log(tes)
  })
  socket.on('hanif', data => {
    console.log(data)

  })
  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}
export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', {message, room});
}

