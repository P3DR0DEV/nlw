import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'
import { BadRequestError } from './_errors/bad-request'

export async function registerForEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Register for an event',
        tags: ['attendees'],
        params: z.object({ eventId: z.string().uuid() }),
        body: z.object({ name: z.string().min(3), email: z.string().email() }),
        response: {
          201: z.object({ eventId: z.string().uuid(), attendeeId: z.number() }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params

      const { name, email } = request.body

      const eventExists = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
      })

      if (!eventExists) {
        throw new Error('Event not found')
      }

      const [attendeeFromEmail, amountOfAttendeesForEvent] = await Promise.all([
        prisma.attendee.findUnique({
          where: {
            eventId_email: {
              eventId,
              email,
            },
          },
        }),
        prisma.attendee.count({
          where: {
            eventId,
          },
        }),
      ])

      if (attendeeFromEmail) {
        throw new BadRequestError('Attendee already registered to this event')
      }

      if (eventExists.maximumAttendees && amountOfAttendeesForEvent >= eventExists.maximumAttendees) {
        throw new BadRequestError('This event is full')
      }

      const attendee = await prisma.attendee.create({
        data: {
          name,
          email,
          eventId,
        },
      })

      return reply.status(201).send({ eventId, attendeeId: attendee.id })
    },
  )
}
