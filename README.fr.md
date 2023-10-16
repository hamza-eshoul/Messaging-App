## Projet Messaging App

[![en](https://img.shields.io/badge/lang-en-red)](README.md)

Ce dépôt comprend le Full Stack Messaging App projet créé pour [Odin Project](https://www.theodinproject.com/lessons/nodejs-messaging-app).

L'objectif de ce projet est de créer une application Web de messagerie permettant aux utilisateurs d'envoyer et de recevoir des messages en temps réel.

Une API RESTful a été créé à l'aide d'ExpressJS et sert de backend au projet.

Une interface utilisateur intuitive a été créé à l'aide de ReactJS et sert de frontend au projet.

La bibliothèque Socket.IO a été utilisée pour la fonctionnalité de communication en temps réel entre la partie frontend et backend du projet.

- Lien du projet - https://messaging-app-project.onrender.com
- Dépôt frontend du projet - https://github.com/skynter/Messaging-App-Frontend
- Dépôt backend du projet - https://github.com/skynter/Messaging-App-Backend

## Page d'accueil

![Homepage Screenshot](/screenshots//Homepage-screenshot.png)

## Page de profil

![Profile's page Screenshot](/screenshots//Profile-screenshot.png)

## Version Mobile

![Mobile Version Screenshot](/screenshots//Mobile-version-screenshot.png)

## Technologies Utilisées

- NodeJS
- ExpressJS
- MongoDB
- ReactJS
- Tailwind CSS
- Socket.IO
- Cloudinary NodeJS

## Principales Fonctionnalités

- Transmission en temps réel de messages entre utilisateurs
- Intégration avec une RESTful backend API
- Authentification à travers les JWTs
- Personnalisation des profils d'utilisateurs
- Opérations CRUD (Ajout et suppression de messages / Personnalisation de profils)
- Interface Utilisateur Intuitive
- Interface Utilisateur Responsive

## Installation

Pour exécuter le projet localement sur votre machine :

- Accédez au dossier frontend du projet et exécutez la commande suivante pour installer les dépendances du projet : 

```
npm install
```

- Exécutez la commande suivante pour pour générer un serveur local de développement 

```
npm run dev
```

- Ouvrez http://localhost:5173 avec votre navigateur pour accéder à la version locale du frontend de votre projet

- Les points de terminaison de l'API figurant au niveau du dossier backend du projet sont accessibles à travers l'API hébergé sur https://odin-messaging-app-api.onrender.com

- Les deux points de terminaisons principaux de l'API sont le GET https://odin-messaging-app-api.onrender.com/conversation et le POST https://odin-messaging-app-api.onrender.com/conversation/add_message