'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ProfileAvatarPreview } from '@/components/profile/profile-avatar-preview';
import { useConfirmation } from '@/components/providers/confirmation/confirmation.hook';
import { Button } from '@/components/ui/actions/button';
import { DeleteIcon } from '@/components/icons/delete';
import { UploadIcon } from '@/components/icons/upload';
import { deleteProfileImage, uploadProfileImage } from '@/actions/profile';
import { PROFILE_IMAGE_ACCEPT, PROFILE_IMAGE_MAX_BYTES } from '@/constants/profile';
import { useAsyncAction } from '@/hooks/use-async-action';

type ProfileImageUploadProps = {
  initialImage: string | null;
  name: string;
};

export function ProfileImageUpload(props: ProfileImageUploadProps) {
  const { initialImage, name } = props;
  const router = useRouter();
  const confirm = useConfirmation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(initialImage);

  async function uploadImage(file: File) {
    if (file.size > PROFILE_IMAGE_MAX_BYTES) {
      throw new Error('Изображение должно быть не больше 5 МБ');
    }

    const formData = new FormData();
    formData.append('image', file);

    const result = await uploadProfileImage(formData);
    if (result.error) throw new Error(result.error);
    if (!result.image) throw new Error('Не удалось загрузить изображение');

    setImage(result.image);
    toast.success('Фото профиля обновлено');
    router.refresh();
  }

  async function deleteImage() {
    const { error } = await deleteProfileImage();
    if (error) throw new Error(error);

    setImage(null);
    toast.success('Фото профиля удалено');
    router.refresh();
  }

  const [executeUpload, isUploading] = useAsyncAction(uploadImage);

  function handleSelectImage() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    void executeUpload(file);
    event.target.value = '';
  }

  function handleDeleteClick() {
    confirm({
      title: 'Удалить фото профиля?',
      description: 'Текущее фото профиля будет удалено. Это действие нельзя отменить.',
      confirmLabel: 'Удалить',
      Icon: DeleteIcon,
      destructive: true,
      action: deleteImage,
    });
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
            onClick={handleDeleteClick}
          >
            Удалить
          </Button>
        </div>
        <p className="text-muted-foreground text-sm">JPG, PNG или WebP до 5 МБ</p>
      </div>
    </div>
  );
}
