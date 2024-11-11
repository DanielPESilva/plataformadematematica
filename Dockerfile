FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
EXPOSE 3000
RUN npm ci
RUN npm run prisma
CMD ["node", "server.js"] 
# ou ENTRYPOINT [ 'node', 'server.js']

# - docker build -t plataforma-matematica-img .
# - docker build -t plataforma-matematica-img .
# - docker images
# - docker run -d -p 8080:8080 --name plantaforma-matematica-cont plataforma-matematica-img
# - docker ps
# - curl http://localhost:8080
# - docker stop plataforma-matematica-cont
# - docker rm plataforma-matematica-cont
# - Se houver mais alguma, adicione aqui...

