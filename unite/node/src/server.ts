import fastify from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { createEvent, getEvent, registerForEvent } from './routes'
import { getEventFromSlug } from './routes/get-event-from-slug'

const app = fastify()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getEventFromSlug)

app.listen({ port: 3000 }).then(() => {
  console.log('[server] listening on port 3000...')
})
