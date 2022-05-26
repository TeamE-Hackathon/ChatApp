# Pull the Node image from Docker Hub
FROM node:alpine

# Setting Working Directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json to working directory
COPY package*.json ./

# This command is similar to npm install and significantly faster
RUN npm ci

# Copy rest of the code to container
COPY . .

# 3000:Web server port, 3001: websocket for chat
EXPOSE 3000 3001

# Run the React app
CMD ["npm", "start"]
