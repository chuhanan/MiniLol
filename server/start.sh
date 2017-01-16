#!/bin/sh
echo "Starting redis..."
docker run --name lol_redis -p 6379:6379 -v $PWD/data:/data -d redis redis-server --appendonly yes
# echo "Build custom image..."
# docker build -t lol_image .
echo "Starting node server"
docker run --name lol --link lol_redis:redis -v $PWD:/app -p 8080:8080 -i node:6.9.2-slim bash -c "cd /app && sh ./init.sh"
