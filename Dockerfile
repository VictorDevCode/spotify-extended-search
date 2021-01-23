FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm i

# Copy app files to container
COPY . .

EXPOSE 3000

# Start the application
CMD ["npm", "start"]