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

EXPOSE 3001

# Run the API on Nodemon
CMD ["npm", "run", "dev"]