import { fastify } from "fastify";
import { z } from "zod";
const app = fastify();

app.post("/polls", async (request, reply) => {
  const createPollBody = z.object({
    title: z.string()
  })

  const { title } = createPollBody.parse(request.body);

  return reply.status(201).send({
    title
  })
})

app.listen({ port: 3000 }).then(() => {
  console.log("[SERVER] HTTP server listening on port 3000");
})