FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ../

# Bundle app source
COPY . ./

RUN npm install -g serve
RUN npm install --production

# If you are building your code for production
RUN npm run build

serve -s build

EXPOSE 8000
CMD [ "serve -s build" ]