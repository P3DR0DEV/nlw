import { fastify } from "fastify";
import { createPoll, getPoll, voteOnPoll } from "./routes";
import cookie from "@fastify/cookie"


const app = fastify();

app.register(cookie, { hook: "onRequest", secret: "polls-app,nlw" });

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.listen({ port: 3000 }).then(() => {
  console.log("[SERVER] HTTP server listening on port 3000");
})