import { Search, MoreHorizontal, ChevronsLeft, ChevronsRight, ChevronRight, ChevronLeft } from 'lucide-react'

export function AttendeeList() {
  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 border border-white/10 px-3 py-1.5 rounded-lg  flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="outline-none bg-transparent flex-1 text-sm border-0 p-0 ring-0"
            type="text"
            placeholder="Buscar participantes..."
          />
        </div>
      </div>

      <div className=" border border-white/10 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className=" border-b border-white/10 ">
              <th className="py-3 px-4 font-semibold text-sm text-left" style={{ width: 48 }}>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
              </th>
              <th className="py-3 px-4 font-semibold text-sm text-left">Código</th>
              <th className="py-3 px-4 font-semibold text-sm text-left">Participante</th>
              <th className="py-3 px-4 font-semibold text-sm text-left">Data de inscrição</th>
              <th className="py-3 px-4 font-semibold text-sm text-left">Data de check-in</th>
              <th style={{ width: 64 }} className="py-3 px-4 font-semibold text-sm text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10 hover:bg-white/10">
              <td className="py-3 px-4 text-sm text-zinc-300">
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
              </td>
              <td className="py-3 px-4 text-sm text-zinc-300">132342</td>
              <td className="py-3 px-4 text-sm text-zinc-300">
                <div className="flex flex-col gap-1">
                  <span className=" font-semibold text-white">Nome do participante</span>
                  <span>emails</span>
                </div>
              </td>
              <td className="py-3 px-4 text-sm text-zinc-300">7 dias atrás</td>
              <td className="py-3 px-4 text-sm text-zinc-300">10 dias atrás</td>
              <td className="py-3 px-4 text-sm text-zinc-300">
                <button className="bg-black/20 border border-white/10 rounded-md p-1.5">
                  <MoreHorizontal className="size-4" />
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300">
                Showing 10 of 100 items
              </td>
              <td colSpan={3} className="py-3 px-4 text-sm text-zinc-300 text-right">
                <div className="inline-flex items-center gap-8">
                  <span>Page 1 of 5</span>
                  <div className="flex gap-1.5">
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronsLeft className="size-4" />
                    </button>
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronLeft className="size-4" />
                    </button>
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronRight className="size-4" />
                    </button>
                    <button className="bg-white/10 border border-white/10 rounded-md p-1.5">
                      <ChevronsRight className="size-4" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  )
}
