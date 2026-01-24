# Stage 1: Build the application
FROM node:24.7.0-alpine AS build

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install bun globally as root
RUN npm install -g bun

# Set the working directory
WORKDIR /app

# Copy package configuration files
COPY package.json package-lock.json* bun.lockb* ./

# Install dependencies - using bun if available, otherwise npm
RUN if [ -f bun.lockb ]; then \
      bun install; \
    else \
      npm install; \
    fi

# Copy the rest of the application source code
COPY . .

# Build the project
RUN npm run build

# Generate sitemap after the build
# RUN npm run generate-sitemap

# Change ownership of the app directory to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Stage 2: Serve the static files with Nginx
FROM nginx:1.24-alpine

# Copy the custom Nginx configuration
COPY config/nginx.conf /etc/nginx/nginx.conf

# Create a temporary directory for Nginx and set permissions
RUN mkdir -p /tmp/nginx && \
    chown -R nginx:nginx /tmp/nginx

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Grant permissions to nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html

# Set OS environment variables
COPY bin/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

# Switch to the non-root user
USER nginx

# Expose port 8080 for the Nginx server
EXPOSE 8080

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
