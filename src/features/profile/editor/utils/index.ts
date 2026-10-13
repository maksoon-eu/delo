import type { ProfileInput } from '@/shared/schemas/profile';
import type { UserProfile } from '@/shared/types/profile';

export function profileToFormValues(profile: UserProfile): ProfileInput {
  return { name: profile.name, workTerms: profile.workTerms ?? '' };
}
