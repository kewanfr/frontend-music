import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.VITE_WEBSOCKET_URL || undefined;

// export const socket = io(URL);
export const socket = io(URL, {
  closeOnBeforeunload: true,
  transports: ["websocket"],
});
