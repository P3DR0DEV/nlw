import { cn } from '../../lib/utils'

type TableHeaderProps = React.ComponentProps<'th'>

export function TableHeader({ className, ...props }: TableHeaderProps) {
  return <th {...props} className={cn('py-3 px-4 font-semibold text-sm text-left', className)} />
}
