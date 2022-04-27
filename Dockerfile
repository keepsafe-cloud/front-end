FROM nginx:1.21.6

EXPOSE 80

COPY frontend/. /usr/share/nginx/html