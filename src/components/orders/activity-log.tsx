'use client';

import { EmptyList } from '@/components/ui/feedback/empty-list';
import { ACTIVITY_TYPE_ICONS } from '@/constants';
import { formatDate } from '@/lib/utils';
import type { ActivityEntry } from '@/types';

type ActivityLogProps = {
  activities: ActivityEntry[];
};

export function ActivityLog(props: ActivityLogProps) {
  const { activities } = props;

  return (
    <EmptyList items={activities} message="Нет записей">
      <div className="space-y-5">
        {activities.map((activity) => {
          const Icon = ACTIVITY_TYPE_ICONS[activity.type];
          return (
            <div key={activity.id} className="flex gap-3">
              <div className="text-muted-foreground mt-0.5 shrink-0">
                <Icon size={16} />
              </div>
              <div>
                <p className="">{activity.text}</p>
                <p className="text-muted-foreground text-xs font-bold">
                  {formatDate(activity.createdAt, 'd MMM yyyy, HH:mm')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </EmptyList>
  );
}
