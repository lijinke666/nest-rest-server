FROM node:10.15.3

COPY . /app

WORKDIR /app

RUN yarn

EXPOSE 3000

CMD yarn start
