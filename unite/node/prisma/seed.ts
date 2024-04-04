import { prisma } from '../src/lib/prisma'

async function seed() {
  await prisma.event.create({
    data: {
      id: 'baa4e3b6-25e3-473d-9e94-029fba6bff70',
      title: 'My first event',
      slug: 'my-first-event',
      details: 'This is my first event',
      maximumAttendees: 120,
    },
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})
