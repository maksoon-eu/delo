'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { updateProfile, deleteProfileImage, uploadProfileImage } from '@/actions/profile';
import { useConfirmation } from '@/shared/components/providers/confirmation/confirmation.hook';
import { DeleteIcon } from '@/shared/components/icons/delete';
import { PROFILE_IMAGE_MAX_BYTES } from '@/shared/constants/profile';
import { ProfileSchema, type ProfileInput } from '@/shared/schemas/profile';
import type { UserProfile } from '@/shared/types/profile';
import { useAsyncAction } from '@/shared/hooks/use-async-action';
import { Form } from '@/shared/components/ui/form/form';
import { FormInput } from '@/shared/components/ui/form/fields/form-input';
import { FormTextarea } from '@/shared/components/ui/form/fields/form-textarea';
import { Button } from '@/shared/components/ui/actions/button';
import { ArrowRightIcon } from '@/shared/components/icons/arrow-right';
import { profileToFormValues } from './utils';
import { ProfileImageUpload } from './ui/profile-image-upload';

type ProfileEditorProps = { profile: UserProfile };

export function ProfileEditor(props: ProfileEditorProps) {
  const { profile } = props;
  const router = useRouter();
  const form = useForm<ProfileInput>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: profileToFormValues(profile),
  });
  const { control, handleSubmit, reset } = form;
  const initialImage = profile.image;
  const [image, setImage] = useState(initialImage);
  const confirm = useConfirmation();

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

  async function updateProfileImmediately(data: ProfileInput) {
    const { error } = await updateProfile(data);
    if (error) throw new Error(error);
    toast.success('Профиль обновлён');
    reset(data);
    router.refresh();
  }

  const [executeUpdate, isUpdating] = useAsyncAction(updateProfileImmediately);

  return (
    <div className="surface-shadow border-border from-primary/10 via-card/60 to-card/60 bg-linear-to-br rounded-2xl border p-7">
      <ProfileImageUpload
        image={image}
        name={profile.name}
        isUploading={isUploading}
        onUpload={executeUpload}
        onDelete={handleDeleteClick}
      />

      <div className="border-border mt-7 border-t pt-7">
        <Form {...form} onSubmit={handleSubmit(executeUpdate)} className="space-y-5">
          <FormInput control={control} name="name" label="Имя" autoComplete="name" />
          <FormTextarea control={control} name="workTerms" label="Условия работы" rows={7} />
          <div className="flex justify-end">
            <Button type="submit" Icon={ArrowRightIcon} isLoading={isUpdating}>
              Сохранить изменения
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
