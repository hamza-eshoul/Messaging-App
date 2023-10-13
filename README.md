## Messaging App Project

[![fr](https://img.shields.io/badge/lang-fr-blue)](README.fr.md)

This is the parent repository for the Full Stack Messaging App Project built for the [Odin Project Curriculum](https://www.theodinproject.com/lessons/nodejs-messaging-app).

The goal of the project was to build a messaging web app that allows users to send and receive real-time messages to each other.

A restful API was built using ExpressJS and serves as the project's backend.

An intuitive User Interface was built using ReactJS and serves as the project's frontend.

The Socket.IO library wa used for the real-time communication functionality between the project's client and server.

- Project's Live Preview url - https://messaging-app-project.onrender.com
- Project's Frontend Repository - https://github.com/skynter/Messaging-App-Frontend
- Project's Backend Repository - https://github.com/skynter/Messaging-App-Backend

## Homepage

![Homepage Screenshot](/screenshots//Homepage-screenshot.png)

## Profile Page

![Article's Page Screenshot](/screenshots//Profile-screenshot.png)

## Mobile Version

![Mobile Version Screenshot](/screenshots//Mobile-version-screenshot.png)

## Technologies Used

- NodeJS
- ExpressJS
- MongoDB
- ReactJS
- Tailwind CSS
- Socket.IO
- Cloudinary NodeJS

## Key features

- Real-time transmission of messages between users.
- Integration with RESTful backend API
- Persistent Authentication using JWTs
- Customizing users profiles
- CRUD operations (Adding and Deleting Messages / Updating Profiles)
- Intuitive User Interface
- Fully Responsive User Interface

## Installation

To run the project locally :

- Access the project's frontend folder and run the following command to install the project's dependecies

```
npm install
```

- Run the following command to spin up a local development server

```
npm run dev
```

- Open http://localhost:5173 with your browser to access a local version of the project's client
- The API endpoints listed in the backend folder can be accessed through the hosted API on https://odin-messaging-app-api.onrender.com

- The two main API endpoints are the GET https://odin-messaging-app-api.onrender.com/conversation endpoint and the POST https://odin-messaging-app-api.onrender.com/conversation/add_message
