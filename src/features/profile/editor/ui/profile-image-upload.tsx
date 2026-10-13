'use client';

import { useRef, type ChangeEvent } from 'react';
import { ProfileAvatarPreview } from './profile-avatar-preview';
import { Button } from '@/shared/components/ui/actions/button';
import { DeleteIcon } from '@/shared/components/icons/delete';
import { UploadIcon } from '@/shared/components/icons/upload';
import { PROFILE_IMAGE_ACCEPT } from '@/shared/constants/profile';

type ProfileImageUploadProps = {
  image: string | null;
  name: string;
  isUploading: boolean;
  onUpload: (file: File) => Promise<void>;
  onDelete: () => void;
};

export function ProfileImageUpload(props: ProfileImageUploadProps) {
  const { image, name, isUploading, onUpload, onDelete } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSelectImage() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    void onUpload(file);
    event.target.value = '';
  }

  return (
    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
      <ProfileAvatarPreview image={image} name={name} />
      <div className="space-y-3">
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept={PROFILE_IMAGE_ACCEPT}
          onChange={handleFileChange}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            Icon={UploadIcon}
            isLoading={isUploading}
            onClick={handleSelectImage}
          >
            Загрузить фото
          </Button>
          <Button
            type="button"
            variant="outline"
            Icon={DeleteIcon}
            disabled={!image || isUploading}
            onClick={onDelete}
          >
            Удалить
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">JPG, PNG или WebP до 5 МБ</p>
      </div>
    </div>
  );
}
