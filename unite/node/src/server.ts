import fastify from 'fastify'
import z from 'zod'
import { prisma } from './lib/prisma'

const app = fastify()

app.post('/events', async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string(),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  })

  const { title, details, maximumAttendees } = createEventSchema.parse(request.body)

  const event = await prisma.event.create({
    data: {
      title,
      details,
      maximumAttendees,
      slug: new Date().toISOString(),
    },
  })

  reply.status(201).send({ eventId: event.id })
})

app.listen({ port: 3000 }).then(() => {
  console.log('[server] listening on port 3000...')
})
