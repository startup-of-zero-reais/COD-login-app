FROM node:16-alpine3.12

WORKDIR /www/app

COPY . .

RUN yarn

CMD [ "yarn", "dev" ]