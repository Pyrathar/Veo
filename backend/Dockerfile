# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package*.json, .env and the rest for efficient caching
COPY package*.json .env ./

# Install all dependencies (including devDependencies for building the project)
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the TypeScript project
RUN npm run build

# Run the migrations for prisma
RUN npx prisma generate


# Expose the port the app will run on
EXPOSE 4000

# Start the application using the transpiled JavaScript code
CMD ["npm","run","dev"]
