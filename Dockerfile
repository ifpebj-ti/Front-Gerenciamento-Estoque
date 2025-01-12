FROM node:lts-alpine AS build
WORKDIR /app

# Copiar apenas os arquivos necessários para o build
COPY package*.json ./
COPY .env.production ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir a aplicação
RUN npm run build:prod

FROM node:lts-alpine AS runtime
WORKDIR /app

# Copiar os arquivos construídos do estágio anterior
COPY --from=build /app /app

# Expor a porta da aplicação
EXPOSE 3000

# Configurar variáveis de ambiente para produção
ENV PORT=3000
ENV NODE_ENV=production

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
