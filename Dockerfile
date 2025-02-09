#to deploy
#npm run docker:clean 
#npm run docker:build
# npm run docker:push  
# npm run docker:deploy

#See nginx.conf
#package.json
#vite.config.js


FROM node:20.10.0 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
