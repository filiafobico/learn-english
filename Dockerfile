FROM node:14-alpine AS development

WORKDIR /src/usr/app
COPY . .
RUN npm install --only=development
CMD ["npm", "run", "start:dev"]

FROM node:14-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /src/usr/app
RUN npm install --only=production
RUN npm run build
COPY dist ./dist

CMD ["node", "dist/main"]
