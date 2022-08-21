FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update
RUN npm install -g nodemon
RUN npm install -g env-cmd@8.0.2 --save-dev
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["npm","start"]