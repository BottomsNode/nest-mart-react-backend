# Stage 1: Build stage
FROM node:18 AS builder

WORKDIR /app

# Copy only necessary files for install & build
COPY package.json yarn.lock tsconfig*.json nest-cli.json ./
COPY src ./src

# Install all dependencies (including dev)
RUN yarn install --frozen-lockfile

# Build NestJS app
RUN yarn build

# Stage 2: Production runtime
FROM node:18-slim AS runner

WORKDIR /app

# Copy package files to install only production dependencies
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Copy built code from builder
COPY --from=builder /app/dist ./dist

# Optionally: copy static files if needed
# COPY public ./public

# Expose port (optional: default is 3000)
EXPOSE 3000

# Run the app
CMD ["node", "dist/main.js"]
