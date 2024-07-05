# Use the official Node.js base image
FROM --platform=linux/arm64 node:20-alpine AS base

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm i

# Copy application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Run the app

CMD ["pnpm", "start"]
