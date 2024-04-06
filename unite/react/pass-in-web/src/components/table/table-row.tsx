import { cn } from '../../lib/utils'

interface TableRowProps extends React.ComponentProps<'tr'> {
  className?: string
}

export function TableRow({ className, ...props }: TableRowProps) {
  return <tr {...props} className={cn('border-b border-white/10 hover:bg-white/10', className)} />
}
