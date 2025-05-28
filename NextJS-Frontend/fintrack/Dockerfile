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