import cookie from "@fastify/cookie"
import websocket from "@fastify/websocket"
import { fastify } from "fastify";
import { createPoll, getPoll, voteOnPoll } from "./routes";
import { pollResult } from "./ws/poll-results";


const app = fastify();

app.register(cookie, { hook: "onRequest", secret: "polls-app,nlw" });
app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResult)

app.listen({ port: 3000 }).then(() => {
  console.log("[SERVER] HTTP server listening on port 3000");
})