import {io} from 'socket.io-client'

export const initSocket = async () => {

    const options = {
        'force new connection' : true,
        reconnectionAttempt : 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    }

    const socket = io("http://localhost:8071/", options);

    socket.on('connect', () => {
        console.log('Socket connected successfully');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
    });

    return socket;
}
