// import { IncomingMessage, ServerResponse } from "http";
// import { RawData, WebSocket, WebSocketServer } from "ws";

// import { NextApiRequest } from "next";

// const websocketServer = new WebSocketServer({ noServer: true });

// const clients = new Map<string, Set<WebSocket>>();

// websocketServer.on("connection", (socket: WebSocket, req: IncomingMessage) => {
//   const id = req.url?.slice(1); // Extract room ID from URL
//   if (id) {
//     if (!clients.has(id)) {
//       clients.set(id, new Set());
//     }
//     clients.get(id)?.add(socket);

//     socket.on("message", (message: RawData) => {
//       clients.get(id)?.forEach((client) => {
//         if (client !== socket && client.readyState === 1) {
//           // WebSocket.OPEN is 1
//           client.send(message);
//         }
//       });
//     });

//     socket.on("close", () => {
//       clients.get(id)?.delete(socket);
//       if (clients.get(id)?.size === 0) {
//         clients.delete(id);
//       }
//     });
//   }
// });

// export default function handler(req: NextApiRequest, res: ServerResponse) {
//   if (req.method === "GET") {
//     res.writeHead(200, {
//       "Content-Type": "text/plain",
//     });
//     res.end("WebSocket server is running");
//   } else {
//     res.writeHead(405, {
//       "Content-Type": "text/plain",
//     });
//     res.end("Method Not Allowed");
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // if (!process.env.VERCEL) {
// if (true) {
//   const server = require("http").createServer(handler);
//   server.listen(3001, () => {
//     console.log("WebSocket server is running on http://localhost:3001");
//   });

//   server.on(
//     "upgrade",
//     (request: IncomingMessage, socket: any, head: Buffer) => {
//       websocketServer.handleUpgrade(request, socket, head, (ws: WebSocket) => {
//         websocketServer.emit("connection", ws, request);
//       });
//     }
//   );
// }

import { IncomingMessage, ServerResponse } from "http";
import { RawData, WebSocket, WebSocketServer } from "ws";

import { NextRequest } from "next/server";

const websocketServer = new WebSocketServer({ noServer: true });

const clients = new Map<string, Set<WebSocket>>();

websocketServer.on("connection", (socket: WebSocket, req: IncomingMessage) => {
  const id = req.url?.slice(1); // Extrae el ID de la URL
  if (id) {
    if (!clients.has(id)) {
      clients.set(id, new Set());
    }
    clients.get(id)?.add(socket);

    socket.on("message", (message: RawData) => {
      clients.get(id)?.forEach((client) => {
        if (client !== socket && client.readyState === 1) {
          // WebSocket.OPEN is 1
          client.send(message);
        }
      });
    });

    socket.on("close", () => {
      clients.get(id)?.delete(socket);
      if (clients.get(id)?.size === 0) {
        clients.delete(id);
      }
    });
  }
});

export async function GET(req: NextRequest) {
  return new Response("🟩 WebSocket server is running", { status: 200 });
}

export async function POST(req: NextRequest) {
  return new Response("Method Not Allowed", { status: 405 });
}

const server = require("http").createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("🟩🟩 WebSocket server is running");
    } else {
      res.writeHead(405, {
        "Content-Type": "text/plain",
      });
      res.end("Method Not Allowed");
    }
  }
);

server.listen(3002, () => {
  console.log("🟢 WebSocket server is running on http://localhost:2ss");
});

server.on("upgrade", (request: IncomingMessage, socket: any, head: Buffer) => {
  websocketServer.handleUpgrade(request, socket, head, (ws: WebSocket) => {
    websocketServer.emit("connection", ws, request);
  });
});
