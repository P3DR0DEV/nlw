import { z } from 'zod'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/utils/generate-slug'
import { BadRequestError } from './_errors/bad-request'

export async function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
      schema: {
        summary: 'Create a new event',
        tags: ['events'],
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullish(),
          maximumAttendees: z.number().int().positive().nullish(),
          slug: z.string().nullish(),
        }),
        response: {
          201: z.object({ eventId: z.string().uuid() }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees, slug } = request.body

      const generatedSlug = generateSlug(title)

      const isSlugAlreadyInUse = await prisma.event.findUnique({
        where: {
          slug: slug || generatedSlug,
        },
      })

      if (isSlugAlreadyInUse) {
        throw new BadRequestError('Slug already in use')
      }

      const event = await prisma.event.create({
        data: {
          title,
          details,
          maximumAttendees,
          slug: slug || generatedSlug,
        },
      })

      reply.status(201).send({ eventId: event.id })
    },
  )
}
