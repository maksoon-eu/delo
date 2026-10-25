import { auth } from '@/config/auth';
import { db } from '@/shared/config/db';
import { getS3Object } from '@/shared/utils/s3';

type ProfileImageRouteContext = {
  params: Promise<{ key: string[] }>;
};

export async function GET(_request: Request, context: ProfileImageRouteContext) {
  const session = await auth();
  if (!session) return new Response(null, { status: 401 });

  const { key: keyParts } = await context.params;
  const key = keyParts.join('/');
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { image: true },
  });

  if (!user?.image || user.image !== key) return new Response(null, { status: 404 });

  try {
    const object = await getS3Object(user.image);
    if (!object.Body) return new Response(null, { status: 404 });

    const headers = new Headers({
      'Content-Type': object.ContentType ?? 'application/octet-stream',
      'Cache-Control': 'private, no-store',
    });

    if (object.ContentLength) {
      headers.set('Content-Length', String(object.ContentLength));
    }

    return new Response(object.Body.transformToWebStream(), { headers });
  } catch {
    return new Response(null, { status: 404 });
  }
}
