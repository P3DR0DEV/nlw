import React from 'react'
import { Search, MoreHorizontal, ChevronsLeft, ChevronsRight, ChevronRight, ChevronLeft } from 'lucide-react'

import { table } from './table'
import { IconButton } from './icon-button'
import { attendees } from '../data/attendees'
import { compareDates } from '../lib/day-js'

const tableheaders = ['Código', 'Participante', 'Data de inscrição', 'Data de check-in']

export function AttendeeList() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [page, setPage] = React.useState(1)

  function handleSearchInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target

    setSearchTerm(value)
  }

  const totalPages = Math.ceil(attendees.length / 10)

  function handlePreviousPage() {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  function handleNextPage() {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

  function handleGoToFirstPage() {
    setPage(1)
  }

  function handleGoToLastPage() {
    setPage(totalPages)
  }

  return (
    <main className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="w-72 border border-white/10 px-3 py-1.5 rounded-lg  flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="outline-none bg-transparent flex-1 text-sm border-0 p-0"
            type="text"
            placeholder="Buscar participantes..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>

      <table.Table>
        <thead>
          <tr className="border-b border-white/10 ">
            <table.TableHeader style={{ width: 48 }}>
              <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
            </table.TableHeader>
            {tableheaders.map((header, index) => (
              <table.TableHeader key={index}>{header}</table.TableHeader>
            ))}
            <table.TableHeader
              style={{ width: 64 }}
              className="py-3 px-4 font-semibold text-sm text-left"
            ></table.TableHeader>
          </tr>
        </thead>

        <tbody>
          {attendees.slice((page - 1) * 10, page * 10).map((attendee) => (
            <table.TableRow key={attendee.id}>
              <table.TableCell>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
              </table.TableCell>
              <table.TableCell>{attendee.id}</table.TableCell>
              <table.TableCell>
                <div className="flex flex-col gap-1">
                  <span className=" font-semibold text-white">{attendee.name}</span>
                  <span>{attendee.email}</span>
                </div>
              </table.TableCell>
              <table.TableCell>{compareDates(attendee.createdAt)}</table.TableCell>
              <table.TableCell>{compareDates(attendee.checkedInAt)}</table.TableCell>
              <table.TableCell>
                <IconButton className="bg-black/20">
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </table.TableCell>
            </table.TableRow>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <table.TableCell colSpan={3}>Showing 10 of {attendees.length} items</table.TableCell>
            <table.TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8">
                <span>
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={handleGoToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={handlePreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={handleNextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={handleGoToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </table.TableCell>
          </tr>
        </tfoot>
      </table.Table>
    </main>
  )
}
