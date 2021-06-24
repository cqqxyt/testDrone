FROM node:16 as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

# FROM base as test
RUN rm -rf node_modules
RUN npm install
RUN npm rebuild node-sass
RUN npm install pm2 -g
COPY . .
# CMD [ "npm", "run", "test" ]

CMD npm run dev