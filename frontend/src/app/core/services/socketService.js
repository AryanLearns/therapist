// Add to backend dependencies
npm install socket.io

// src/services/socketService.js
const socketIo = require('socket.io');

class SocketService {
  constructor(server) {
    this.io = socketIo(server, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:4200',
        methods: ['GET', 'POST']
      }
    });

    this.io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      socket.on('join-therapist-room', (therapistId) => {
        socket.join(`therapist-${therapistId}`);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);