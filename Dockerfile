# Use the official Node.js image from Docker Hub
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the package.json and package-lock.json (if exists) to leverage Docker cache
COPY package*.json ./

# Install project dependencies
RUN npm i --force

# Copy the rest of the application files to the container
COPY . .

RUN npm run build

# Set the default command to run the application
CMD ["npm", "start"]