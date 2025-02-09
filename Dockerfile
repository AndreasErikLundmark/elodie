# docker buildx build -t flask_backend:latest --platform linux/amd64 .
# docker tag elodie4:latest gcr.io/elodie-fe/elodie4
# docker push gcr.io/elodie-fe/elodie4           
# Use the official Node.js runtime as the base image

# Step 1: Build the app using Node.js as the base image
FROM node:20.10.0 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire application code into the container
COPY . .

# Build the Vite project for production
RUN npm run build

# Step 2: Use Nginx as the production server
FROM nginx:alpine

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built Vite app to Nginx's web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 8080

# Start Nginx in the container
CMD ["nginx", "-g", "daemon off;"]
