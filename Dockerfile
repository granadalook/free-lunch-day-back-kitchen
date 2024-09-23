# Usa la imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de producción
RUN npm install --only=production

# Copia el resto del código fuente
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto en el que corre tu aplicación
EXPOSE 3000

# Comando para ejecutar tu aplicación
CMD ["npm", "run", "start:prod"]
