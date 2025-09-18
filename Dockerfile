# Image Node officielle
FROM node:20

# Créer le dossier de l'app
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Exposer un port (non obligatoire pour WhatsApp)
EXPOSE 3000

# Lancer le bot
CMD ["npm", "start"]
