import { io } from "socket.io-client";

const URL = "https://odin-messaging-app-api.onrender.com";

export const socket = io(URL);
