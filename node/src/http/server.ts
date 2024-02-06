import { fastify } from "fastify";
import { createPoll, getPoll, voteOnPoll } from "./routes";

const app = fastify();

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.listen({ port: 3000 }).then(() => {
  console.log("[SERVER] HTTP server listening on port 3000");
})