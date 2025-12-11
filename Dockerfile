# Stage 1: Build the application
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# List the contents of the dist directory for debugging
RUN ls -l /app/dist

# Stage 2: Serve the application
FROM nginx:1.21.3-alpine

# Install envsubst
RUN apk add --no-cache gettext

# Copy the Nginx configuration template and startup script
COPY nginx.conf.template /etc/nginx/templates/
COPY start-nginx.sh /
RUN chmod +x /start-nginx.sh

# Expose port 8080 (or whatever Cloud Run provides)
EXPOSE 8080

# Start Nginx using the startup script
CMD ["/start-nginx.sh"]