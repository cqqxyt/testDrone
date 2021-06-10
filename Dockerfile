FROM node:16 as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

# FROM base as test
RUN rm -rf node_modules
RUN npm install
RUN npm rebuild node-sass
COPY . .
# CMD [ "npm", "run", "test" ]

FROM base as serve
# RUN npm ci --production
# COPY . .
CMD [ "npm", "run" ,"serve" ]