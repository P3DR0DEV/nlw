import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/utils/generate-slug'

export async function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
      schema: {
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({ eventId: z.string().uuid() }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body

      const slug = generateSlug(title)

      const isSlugAlreadyInUse = await prisma.event.findUnique({
        where: {
          slug,
        },
      })

      if (isSlugAlreadyInUse) {
        return reply.status(409).send({ message: 'Slug already in use' })
      }

      const event = await prisma.event.create({
        data: {
          title,
          details,
          maximumAttendees,
          slug,
        },
      })

      reply.status(201).send({ eventId: event.id })
    },
  )
}
