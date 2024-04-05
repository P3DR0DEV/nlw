import { AttendeeList } from './components/attendee-list'
import { Header } from './components/header'

export function App() {
  return (
    <main className="px-8 py-5 max-w-screen-xl mx-auto space-y-5">
      <Header />
      <AttendeeList />
    </main>
  )
}
