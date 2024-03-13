FROM node:21.1.0-alpine3.17 AS builder

WORKDIR /app

COPY ["package.json",".env","yarn.lock","tsconfig.json","./"] 

RUN yarn install

COPY . .

RUN yarn build

# Stage-2
FROM nginx:1.25.3-alpine-slim

# Copy the static file to my Nginx folder to serve static contain
COPY --from=builder /app/dist /usr/share/nginx/html

# Open the port to react
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]