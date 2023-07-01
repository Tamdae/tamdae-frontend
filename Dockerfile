FROM node:latest

# Copy the SSH private key to the image
COPY auth_key /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

# Disable strict host key checking
RUN echo "StrictHostKeyChecking no" >> /root/.ssh/config

# Install git for cloning the project repository
RUN apt-get update && apt-get install -y git

# Clone the project repository
RUN git clone git@github.com:Tamdae/tamdae-frontend.git /app

ENV AUTH_URL=http://localhost:18100/
ENV API_URL=http://localhost:18101/

# Set the working directory
WORKDIR /app

RUN npm install -g serve
RUN npm install

# If you are building your code for production
RUN npm run build

# serve -s build
EXPOSE 3000
CMD ["serve", "-s", "build"]
