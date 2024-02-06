import { prisma } from "../../lib/prisma";
import { z } from "zod"
import { FastifyInstance } from "fastify";

export async function voteOnPoll(app: FastifyInstance) {
  app.post("/polls/:pollId/vote", async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionsId: z.string().uuid(),
    })

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollOptionsId } = voteOnPollBody.parse(request.body);
    const { pollId } = voteOnPollParams.parse(request.params);


    return reply.status(201).send()
  })
}