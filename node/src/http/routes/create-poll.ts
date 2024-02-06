import { prisma } from "../../lib/prisma";
import { z } from "zod"
import { FastifyInstance } from "fastify";

export async function createPoll(app: FastifyInstance) {
  app.post("/polls", async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
      options: z.array(z.string()),
    })

    const { title, options } = createPollBody.parse(request.body);

    const poll = await prisma.poll.create({
      data: {
        title,
        // aqui, o prisma identifica a relação e já faz a transaction
        options: {
          // createMany para criar múltiplas opções
          createMany: {
            data: options.map((option) => {
              return {
                // prisma identifica relação e já coloca o id
                title: option
              }
            })
          }
        }
      }
    })

    return reply.status(201).send({
      pollId: poll.id
    })
  })
}