FROM node:10.16.0


# put this just after node so we can reuse the pm2 image 
# RUN npm i -g pm2

WORKDIR /usr/src/app

# RUN mkdir config && mkdir config/key && cd config/key && openssl req -nodes -new -x509 -keyout server.key -out server.cert

COPY package*.json ./

RUN npm i

COPY . .

# CMD ["pm2-runtime","server.js","--name","exposed_http_server"]
CMD npm start  
