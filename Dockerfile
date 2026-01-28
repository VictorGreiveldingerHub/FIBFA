# Base image
FROM node:24.11.1

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 54520

# Start app
CMD ["npm", "run", "dev"]