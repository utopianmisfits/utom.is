FROM node:12.15.0-alpine AS builder

# Install dependencies required to build node-argon2
RUN apk add --update python3 make g++ gcc libgcc libstdc++ linux-headers
RUN npm install node-gyp -g

# Build project
WORKDIR /opt
COPY . .
RUN npm ci
RUN npm run build

FROM node:12.15.0-alpine
WORKDIR /opt
COPY --from=builder /opt/dist .
EXPOSE 4000
CMD ["npm", "start"]
