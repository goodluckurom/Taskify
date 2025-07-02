import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { mockActivities } from "@/lib/mock-data"

interface ProjectActivityFeedProps {
  projectId: string
  limit?: number
}

export function ProjectActivityFeed({ projectId, limit = 5 }: ProjectActivityFeedProps) {
  const activities = mockActivities.filter((activity) => activity.projectId === projectId).slice(0, limit)

  return (
    <div className="mt-4 space-y-4">
      {activities.map((activity, i) => (
        <div key={i} className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{activity.user.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user}</span> {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
