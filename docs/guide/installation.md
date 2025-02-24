# Installation Guide - Modern Dictionary

Welcome to the installation guide for [Modern Dictionary](https://modern-dictionary.com). Follow the steps below to set up the project on your local machine.

## Prerequisites
Ensure you have the following installed:

- **PHP 8.1+** (for Laravel backend)
- **Composer** (PHP dependency manager)
- **Node.js 18+** (for Vue.js frontend and WebSockets)
- **Nginx** (as a reverse proxy)
- **MySQL** (or SQLite as an alternative)
- **Redis** (for caching and queues)
- **Elasticsearch** *(optional, for advanced search capabilities)*

## Backend Setup (Laravel)

### 1. Clone the Repository
```sh
 git clone https://github.com/modern-dictionary/backend.git
 cd backend
```

### 2. Install Dependencies
```sh
 composer install
```

### 3. Configure Environment Variables
Copy the example environment file and update necessary settings:
```sh
 cp .env.example .env
```
Update `.env` file:
```
 DB_CONNECTION=mysql
 DB_HOST=127.0.0.1
 DB_PORT=3306
 DB_DATABASE=modern_dictionary
 DB_USERNAME=root
 DB_PASSWORD=

 REDIS_HOST=127.0.0.1
 REDIS_PORT=6379
```
If MySQL is unavailable, switch to SQLite:
```
 DB_CONNECTION=sqlite
```

### 4. Generate Application Key
```sh
 php artisan key:generate
```

### 5. Run Migrations & Seed Database
```sh
 php artisan migrate --seed
```

### 6. Start Laravel Server
```sh
 php artisan serve
```

## Frontend Setup (Vue.js)

### 1. Navigate to Frontend Directory
```sh
 cd ../frontend
```

### 2. Install Dependencies
```sh
 npm install
```

### 3. Configure Environment Variables
Create `.env` file:
```
 VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 4. Run Development Server
```sh
 npm run dev
```

## WebSockets Setup (Node.js)

### 1. Navigate to WebSockets Directory
```sh
 cd ../websockets
```

### 2. Install Dependencies
```sh
 npm install
```

### 3. Run WebSocket Server
```sh
 node server.js
```

## Nginx Configuration (Reverse Proxy)
Edit the Nginx configuration to proxy requests correctly:
```
server {
    listen 80;
    server_name modern-dictionary.com;

    location / {
        proxy_pass http://127.0.0.1:5173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
    }

    location /ws/ {
        proxy_pass http://127.0.0.1:6001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```
Restart Nginx:
```sh
 sudo systemctl restart nginx
```

## Final Steps
Now, visit [`http://modern-dictionary.com`](http://modern-dictionary.com) in your browser, and your project should be up and running!

For troubleshooting, refer to the [Developer Documentation](https://modern-dictionary.com/docs).

