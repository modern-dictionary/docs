# Project Architecture

The architecture of Modern Dictionary is designed to ensure flexibility, scalability, and maintainability. The project follows the **Microservices** approach, splitting the backend into multiple services based on functionality.

## Frontend (Vue.js + Vite)
The frontend is built with **Vue.js** and **Vite**. It focuses on fast rendering and is highly modular for easier scalability.

- **Vue.js** handles the user interface and integrates well with the backend API for real-time data fetching and updates.
- **Vite** ensures fast bundling and hot-reloading during development.

## Backend (Laravel + Node.js)
The backend is split into two parts:
- **Laravel**: Handles the core functionalities of the dictionary like word management, user accounts, etc.
- **Node.js (WebSockets + Redis)**: Handles real-time communication for features like instant word updates and collaboration between users.

The use of **Redis** for caching and messaging ensures that the system is fast and responsive under high traffic.

## Database
We use **MySQL** for the relational data storage and **Redis** for caching and real-time messaging.

## Reverse Proxy (Nginx)
In Modern Dictionary, we use **Nginx** as a **reverse proxy** to route requests efficiently between the frontend, backend services, and handle scalability.

### Role of Reverse Proxy
- **Load Balancing**: Nginx acts as a load balancer, distributing traffic between multiple instances of backend services (Laravel and Node.js).
- **Routing**: Nginx directs API requests to the appropriate backend service, ensuring that frontend and backend services remain decoupled.
- **SSL Termination**: Nginx handles **SSL termination**, ensuring that secure (HTTPS) connections are made with the clients and forwarding them to the backend via HTTP.
- **Caching**: Nginx can also cache certain responses for better performance, especially for static resources.

### Diagram
Here is a diagram illustrating the system's architecture:

![Architecture Diagram](https://example.com/architecture-diagram.png)
