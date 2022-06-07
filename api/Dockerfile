# Pull the Node image from Docker Hub
FROM node:18-alpine3.14

# Setting Working Directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json to working directory
COPY package*.json ./

# This command is similar to npm install and significantly faster
RUN npm ci

EXPOSE 3001

# Run the API on Nodemon
CMD ["npm", "run", "dev"]