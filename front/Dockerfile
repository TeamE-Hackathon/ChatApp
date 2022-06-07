# Pull the Node image from Docker Hub
FROM node:18-alpine3.14

# Setting Working Directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json to working directory
COPY package*.json ./

# This command is similar to npm install and significantly faster
RUN npm ci

# 3000:Web server port, 3001: websocket for chat
EXPOSE 3000 3001

# Run the React app
CMD ["npm", "start"]
