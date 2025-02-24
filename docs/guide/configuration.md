# Project Setup and Configuration

##Environment Variables Setup

- **Laravel**: Set the `.env` file in the appropriate directory.
- **Node.js**: Create and configure the corresponding `.env` file if necessary.
- **MySQL & Redis**: Ensure that the database and cache services are set up correctly.

## Nginx Configuration

Below is an example of Nginx configuration to route requests to different parts:

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect HTTP requests to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/nginx/ssl/yourdomain.com.crt;
    ssl_certificate_key /etc/nginx/ssl/yourdomain.com.key;

    location / {
        proxy_pass http://localhost:3000; # Node
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api {
        proxy_pass http://localhost:8000; # Laravel
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```