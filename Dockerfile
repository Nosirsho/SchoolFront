# Этап 1: Сборка Vue.js приложения
FROM node:lts-alpine AS builder
WORKDIR /app
COPY front/package*.json ./
RUN npm install
COPY front/. .
RUN npm run build

# Этап 2: Запуск Nginx для обслуживания статики
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]