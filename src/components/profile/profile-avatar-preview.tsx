import Image from 'next/image';
import { getInitials, getProfileImageUrl } from '@/utils/profile';

type ProfileAvatarPreviewProps = {
  name: string;
  image: string | null;
};

export function ProfileAvatarPreview(props: ProfileAvatarPreviewProps) {
  const { image, name } = props;
  const initials = getInitials(name);
  const imageUrl = getProfileImageUrl(image);

  return (
    <div className="border-border bg-primary/10 text-primary flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border text-xl font-semibold">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          width={80}
          height={80}
          unoptimized
          className="size-full object-cover"
        />
      ) : (
        initials
      )}
    </div>
  );
}
