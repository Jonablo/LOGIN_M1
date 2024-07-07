# Usa una versión específica de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente al directorio de trabajo
COPY . .

# Expone el puerto en el que corre la aplicación
EXPOSE 1000

# Comando para ejecutar la aplicación cuando se inicie el contenedor
CMD ["npm", "start"]
