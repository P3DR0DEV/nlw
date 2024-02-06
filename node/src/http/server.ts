import { fastify } from "fastify";

const app = fastify();

app.get('/', async () => {
  return "Hello World"
})

app.listen({ port: 3000 }).then(() => {
  console.log('HTTP server running on http://localhost:3000')
})