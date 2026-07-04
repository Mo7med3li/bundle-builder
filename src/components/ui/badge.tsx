import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'discount' | 'free'
}

export function Badge({
  className,
  variant = 'discount',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white',
        variant === 'discount' && 'bg-badge',
        variant === 'free' && 'bg-badge',
        className,
      )}
      {...props}
    />
  )
}
