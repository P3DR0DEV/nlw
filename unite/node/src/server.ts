import fastify from 'fastify'
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'

import { checkIn, createEvent, getAttendeeBadge, getEvent, getEventAttendees, registerForEvent } from './routes'
import { errorHandler } from './error-handler'

const app = fastify()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Pass.in API documentation',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})
app.register(fastifyCors, {
  origin: '*',
})

app.register(checkIn)
app.register(getEvent)
app.register(createEvent)
app.register(registerForEvent)
app.register(getAttendeeBadge)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler)

app.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('[server] listening on port 3000...')
})
