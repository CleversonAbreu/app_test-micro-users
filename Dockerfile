FROM node:latest

RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    libmariadb-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm install -g @nestjs/cli

COPY . .

EXPOSE 3030

CMD ["npm", "run", "start:dev"]
