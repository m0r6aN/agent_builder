# Use the official Node.js image
FROM node:16

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Expose port 5000
EXPOSE 5000

# Run the web service on container startup
CMD [ "node", "server.js" ]
