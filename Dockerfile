FROM node:21.6.0-slim as build

WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install --silent
COPY . /usr/src/app
RUN npm run build


FROM nginx:alpine3.18-slim

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
