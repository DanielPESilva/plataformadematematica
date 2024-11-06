FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm ci
RUN npm run prisma
ENTRYPOINT [ 'node', 'server.js']