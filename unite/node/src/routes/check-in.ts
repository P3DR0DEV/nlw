import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'
import { BadRequestError } from './_errors/bad-request'

export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/check-in',
    {
      schema: {
        summary: 'Check in an attendee to a event',
        tags: ['check-in'],
        params: z.object({ attendeeId: z.string().transform(Number) }),
        response: {
          201: z.null(),
          403: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params

      const attendeeCheckIn = await prisma.checkIn.findUnique({
        where: {
          id: attendeeId,
        },
      })

      if (attendeeCheckIn) {
        throw new BadRequestError('Attendee already checked in')
      }

      await prisma.checkIn.create({
        data: {
          attendeeId,
        },
      })

      return reply.status(201).send()
    },
  )
}
