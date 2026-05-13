import Image from 'next/image';
import { getProfileImageUrl } from '@/lib/profile-image';
import { getInitials } from '@/lib/utils';

type ProfileAvatarPreviewProps = {
  name: string;
  image: string | null;
};

export function ProfileAvatarPreview(props: ProfileAvatarPreviewProps) {
  const { image, name } = props;
  const initials = getInitials(name);
  const imageUrl = getProfileImageUrl(image);

  return (
    <div className="border-border bg-primary/10 text-primary flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border text-lg font-semibold">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          width={64}
          height={64}
          unoptimized
          className="size-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}
