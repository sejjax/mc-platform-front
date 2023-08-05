FROM node:18.16.0 as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn cache clean
RUN yarn install

COPY . .

RUN yarn build


FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
