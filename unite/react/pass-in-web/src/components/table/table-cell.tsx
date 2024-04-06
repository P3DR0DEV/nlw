import { cn } from '../../lib/utils'

interface TableCellProps extends React.ComponentProps<'th'> {
  className?: string
}

export function TableCell({ className, ...props }: TableCellProps) {
  return <td {...props} className={cn('py-3 px-4 text-sm text-zinc-300', className)} />
}
