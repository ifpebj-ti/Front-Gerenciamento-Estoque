# Stage 1: Build
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:lts-alpine AS runtime
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000

# Defina as variáveis de ambiente (se necessário)
ENV PORT=3000
ENV NODE_ENV=production

CMD ["npm", "start"]
