import { cn } from '@/lib/utils'

interface SectionIntroProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionIntroProps) {
  const isCentered = align === 'center'

  return (
    <div
      className={cn(
        'space-y-4',
        isCentered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl tracking-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
      ) : null}
    </div>
  )
}
