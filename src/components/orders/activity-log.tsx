import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { EmptyList } from '@/components/ui/feedback/empty-list';
import type { ActivityEntry } from '@/types';

type ActivityLogProps = {
  activities: ActivityEntry[];
};

export function ActivityLog(props: ActivityLogProps) {
  const { activities } = props;

  return (
    <EmptyList items={activities} message="Нет записей">
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="bg-primary/60 mt-1.5 size-2 shrink-0 rounded-full" />
            <div>
              <p className="text-sm">{activity.text}</p>
              <p className="text-muted-foreground text-xs">
                {format(activity.createdAt, 'd MMM yyyy, HH:mm', { locale: ru })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </EmptyList>
  );
}
