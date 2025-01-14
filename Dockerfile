# Step 1: Use the official Node.js 20.17.0 LTS image as the base
FROM node:20.17.0

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json (if available) to the container
COPY package*.json ./

# Step 4: Install dependencies (including dev dependencies like nodemon)
RUN npm install

# Step 5: Install nodemon globally
RUN npm install -g nodemon

# Step 6: Copy the rest of the application files to the container
COPY . .

# Step 7: Expose port 3000 for the app
EXPOSE 3000

# Step 8: Start nodemon to watch for changes
CMD ["nodemon", "--legacy-watch", "index.js"]
