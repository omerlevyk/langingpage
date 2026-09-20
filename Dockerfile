# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM docker.io/library/node:20-alpine AS build
WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm ci

# Build the static site
COPY . .
RUN npm run build

# ---- Serve stage ----
# Unprivileged nginx: runs as non-root (uid 101) and listens on 8080,
# which suits restricted Kubernetes SecurityContexts in the homelab cluster.
FROM docker.io/nginxinc/nginx-unprivileged:1.27-alpine AS runtime

# SPA-friendly nginx config (fallback to index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# nginx runs in the foreground via its default entrypoint/cmd
