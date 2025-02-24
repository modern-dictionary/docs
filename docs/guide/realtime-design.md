
---
# Real-time System Design

Modern Dictionary uses **WebSockets** and **Redis** to ensure that all users connected to the platform receive real-time updates.

## WebSockets (Node.js)
The **Node.js server** handles WebSocket connections. Every time a user adds, updates, or deletes a word, the server broadcasts the change to all connected clients in real-time.

## Redis Pub/Sub
Redis' **Publish/Subscribe (Pub/Sub)** mechanism allows the Node.js server to efficiently broadcast updates to all subscribers. This is critical for scalability, as Redis handles the message queue and delivery to connected clients.

## Real-time Word Updates
When a user adds or updates a word, the change is pushed to all clients:

- A user adds a word through the frontend.
- The frontend sends a request to the Laravel backend.
- The backend processes the word and stores it in the database.
- The Node.js server receives the update and broadcasts it to all connected clients using WebSockets and Redis.

## Example WebSocket Server:
```js
socket.join(`team-${data.teamId}`);

// اضافه کردن کاربر به لیست کاربران آنلاین
await redis.sadd("online_users", data.userId);

io.to(`team-${data.teamId}`).emit("user-joined", {
    userId: data.userId,
    onlineUsers: await redis.smembers("online_users"), // لیست کاربران آنلاین
});
```
---
