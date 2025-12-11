#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Check if the PORT environment variable is set
if [ -z "$PORT" ]; then
  echo "Error: PORT environment variable is not set." >&2
  exit 1
fi

echo "--- Environment Variables ---"
echo "PORT is: $PORT"
echo "---------------------------"

# Substitute the PORT variable in the Nginx configuration
envsubst '$PORT' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf

echo "--- Nginx Configuration ---"
cat /etc/nginx/conf.d/default.conf
echo "--------------------------"

# Start Nginx
nginx -g 'daemon off;'