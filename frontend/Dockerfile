# Stage 0 - Build Frontend Assets
FROM node:16.14.0-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json /workdir/

# Copy the rest of the application code
COPY . /workdir/
RUN npm run build

# Stage 1 - Serve Frontend Assets
FROM fholzer/nginx-brotli:v1.12.2

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]