import { ArrowDown, ArrowUp, type LucideIcon, Minus } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ProjectOverviewCardProps {
  title: string
  value: string
  icon: LucideIcon
  description: string
  trend: number
  trendType?: "positive" | "negative" | "neutral"
}

export function ProjectOverviewCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendType = trend > 0 ? "positive" : trend < 0 ? "negative" : "neutral",
}: ProjectOverviewCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-2 flex items-baseline">
          <h3 className="text-2xl font-semibold">{value}</h3>
          {trend !== 0 && (
            <div
              className={cn(
                "ml-2 flex items-center text-xs font-medium",
                trendType === "positive" && "text-green-600",
                trendType === "negative" && "text-red-600",
                trendType === "neutral" && "text-muted-foreground",
              )}
            >
              {trendType === "positive" && <ArrowUp className="mr-1 h-3 w-3" />}
              {trendType === "negative" && <ArrowDown className="mr-1 h-3 w-3" />}
              {trendType === "neutral" && <Minus className="mr-1 h-3 w-3" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
