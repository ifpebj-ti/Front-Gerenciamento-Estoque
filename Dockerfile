# Etapa 1: Build da aplicação React usando Node Alpine (imagem mais enxuta)
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copiar os arquivos do build para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 443 para HTTPS (sem SSL)
EXPOSE 443

# Configuração Nginx para servir a aplicação
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
