import { cn } from '../lib/utils'

type IconButtonProps = React.ComponentProps<'button'>

export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'bg-white/10 border border-white/10 rounded-md p-1.5 hover:bg-white/20',
        className,
        props.disabled && 'opacity-50',
      )}
    />
  )
}
