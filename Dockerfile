FROM node:20-bullseye

# Install basic development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    sudo

# Create app directory
WORKDIR /workspace

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set proper permissions
RUN chown -R node:node /workspace

# Switch to non-root user
USER node 