FROM node:24.11.1-alpine
COPY . .
WORKDIR /app
RUN npm i
RUN npm run build
CMD [ "npm", "start" ]
