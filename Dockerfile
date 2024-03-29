FROM node:12.18.3-alpine AS builder

WORKDIR /src

COPY ./src/package.json ./src/package-lock.json /src/

RUN npm ci --only=production

FROM node:12.18.3-alpine

WORKDIR /src
CMD ["node", "/src/index.js"]

COPY --from=builder /src /src
COPY ./src /src/
