FROM node:18-alpine

WORKDIR /app

# Install deps based on current package files
COPY package*.json ./
RUN npm ci

# Copy the rest needed to run/build
COPY tsconfig.json ./
COPY src ./src

EXPOSE 3000
CMD ["npm", "run", "dev"]
