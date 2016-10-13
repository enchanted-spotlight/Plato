import io from 'socket.io-client';

const socket = io();

// export default (eventName, data) => {
//   socket.emit(eventName, data);
// };

export default socket;
