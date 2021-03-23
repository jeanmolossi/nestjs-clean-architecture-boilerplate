FROM node:lts-alpine

RUN mkdir -p /home/api/node_modules && chown -R node:node /home/api

WORKDIR /home/api

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

CMD ["yarn", "start:dev"]