FROM nginx:1.17.1-alpine
COPY /dist/commu-service /usr/share/nginx/html


#to upload
#ng build --prod
#docker build -t camiloserr/dst-front-end:vmv .
#docker run -d -it -p 8080:80/tcp --name test camiloserr/dst-front-end:vmv