FROM node:12-alpine as build-step

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN apk add --update git
RUN npm install
RUN npm run build
RUN npm audit fix
RUN npm install -g @angular/cli@8.3.29

ENTRYPOINT ["ng","serve","--host", "0.0.0.0"]
