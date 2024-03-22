FROM node:latest as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

WORKDIR /usr/share/nginx/

COPY --from=build /app/dist ./html

EXPOSE 80

CMD [ "nginx","-g","daemon off;" ]
