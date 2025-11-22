# ============================================
# Stage 1: Build Stage
# ============================================
FROM node:24-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies using npm ci for reproducible builds
# --omit=dev is not needed here as we need devDependencies for build
RUN npm ci --legacy-peer-deps

# Copy application source code
COPY . .

# Build arguments for environment variables
ARG REACT_APP_API_URL
ARG NODE_ENV=production

# Create .env file from build arguments if needed
# This is safer than using .env.example
RUN if [ -n "$REACT_APP_API_URL" ]; then \
      echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env; \
    elif [ -f .env.example ]; then \
      cp .env.example .env; \
    fi

# Build the application
RUN npm run build

# ============================================
# Stage 2: Production Stage
# ============================================
FROM nginx:1.27-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user for nginx
RUN addgroup -g 1001 -S nginx-app && \
    adduser -S nginx-app -u 1001 -G nginx-app

# Copy build artifacts from build stage
COPY --from=build --chown=nginx-app:nginx-app /usr/src/app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY --chown=nginx-app:nginx-app nginx.conf /etc/nginx/nginx.conf

# Create necessary directories and set permissions
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run && \
    chown -R nginx-app:nginx-app /var/cache/nginx /var/log/nginx /var/run /usr/share/nginx/html && \
    chmod -R 755 /var/cache/nginx /var/log/nginx /var/run

# Switch to non-root user
USER nginx-app

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

