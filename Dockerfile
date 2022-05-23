FROM node:latest as build-stage
WORKDIR /app

COPY $PWD/package.json .

# RUN apk --no-cache add curl
RUN yarn install
COPY . .
RUN yarn build
# RUN yarn run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf




