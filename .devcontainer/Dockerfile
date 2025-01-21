FROM node:20-bullseye

# Install basic development tools
RUN apt update && apt install -y less git procps

# Set up permissions for npm global installations
RUN mkdir -p /usr/local/lib/node_modules && \
    mkdir -p /usr/local/share/man/man1 && \
    mkdir -p /usr/local/share/man/man5 && \
    mkdir -p /usr/local/share/man/man7 && \
    chown -R node:node /usr/local/lib/node_modules && \
    chown -R node:node /usr/local/bin && \
    chown -R node:node /usr/local/share/man

# Update npm to latest version as root
RUN npm install -g npm@latest

# Set up non-root user
USER node

# Set the default working directory
WORKDIR /workspace 