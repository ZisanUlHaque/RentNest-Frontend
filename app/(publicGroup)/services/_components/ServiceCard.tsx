import { Check, LucideIcon } from "lucide-react"

type Props = {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
  color: "red" | "blue" | "yellow" | "purple" | "orange" | "cyan"
}

const colorMap = {
  red: {
    iconBg: "bg-rose-500",
    iconShadow: "shadow-rose-500/40",
    checkColor: "text-rose-500",
  },
  blue: {
    iconBg: "bg-blue-500",
    iconShadow: "shadow-blue-500/40",
    checkColor: "text-blue-500",
  },
  yellow: {
    iconBg: "bg-amber-400",
    iconShadow: "shadow-amber-400/40",
    checkColor: "text-amber-500",
  },
  purple: {
    iconBg: "bg-purple-500",
    iconShadow: "shadow-purple-500/40",
    checkColor: "text-purple-500",
  },
  orange: {
    iconBg: "bg-primary",
    iconShadow: "shadow-primary/40",
    checkColor: "text-primary",
  },
  cyan: {
    iconBg: "bg-cyan-500",
    iconShadow: "shadow-cyan-500/40",
    checkColor: "text-cyan-500",
  },
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  color,
}: Props) {
  const styles = colorMap[color]

  return (
    <div className="group relative bg-card border rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Icon */}
      <div
        className={`inline-flex items-center justify-center size-14 rounded-2xl ${styles.iconBg} ${styles.iconShadow} shadow-lg mb-6 group-hover:scale-110 transition-transform`}
      >
        <Icon className="size-7 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center size-5 rounded-full ${styles.iconBg} shrink-0`}
            >
              <Check className="size-3 text-white" strokeWidth={3} />
            </div>
            <span className="text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}