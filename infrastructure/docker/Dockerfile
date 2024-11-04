FROM nginx:1.23.4-alpine-slim

COPY ./dist/sfscon-admin/browser /usr/share/nginx/html
COPY ./infrastructure/nginx/default.conf /etc/nginx/conf.d/default.conf
