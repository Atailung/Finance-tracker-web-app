import os

project_name = "nextjs-docker-app"
os.makedirs(project_name, exist_ok=True)

# Dockerfile content
dockerfile_content = """\
# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies (if package.json is available)
COPY package*.json ./
RUN npm install

# Copy the rest of the app (optional — for production, not dev)
# COPY . .

# Start in dev mode
CMD ["npm", "run", "dev"]
"""

# docker-compose.yml content
docker_compose_content = """\
version: "3.9"

services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    stdin_open: true
    tty: true
"""

# Write Dockerfile
with open(os.path.join(project_name, "Dockerfile"), "w") as f:
    f.write(dockerfile_content)

# Write docker-compose.yml
with open(os.path.join(project_name, "docker-compose.yml"), "w") as f:
    f.write(docker_compose_content)

print(f"✅ Project folder '{project_name}' initialized with Dockerfile and docker-compose.yml")