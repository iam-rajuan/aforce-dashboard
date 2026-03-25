import { cn } from '../../utils/cn'

interface BadgeProps {
  label: string
  tone?: 'green' | 'blue' | 'gray' | 'red' | 'yellow'
}

const tones = {
  green: 'bg-neon/20 text-neon border border-neon/30',
  blue: 'bg-blue-500/20 text-blue-300 border border-blue-400/30',
  gray: 'bg-slate-500/20 text-slate-300 border border-slate-400/20',
  red: 'bg-red-500/20 text-red-300 border border-red-400/20',
  yellow: 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/20',
}

export function Badge({ label, tone = 'gray' }: BadgeProps) {
  return <span className={cn('inline-flex rounded-full px-2 py-1 text-xs font-semibold', tones[tone])}>{label}</span>
}
