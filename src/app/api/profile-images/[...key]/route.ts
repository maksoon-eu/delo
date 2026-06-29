import { auth } from '@/config/auth';
import { getS3Object } from '@/utils/s3';

type ProfileImageRouteContext = {
  params: Promise<{ key: string[] }>;
};

export async function GET(_request: Request, context: ProfileImageRouteContext) {
  const session = await auth();
  if (!session) return new Response(null, { status: 401 });

  const { key: keyParts } = await context.params;
  const key = keyParts.join('/');

  try {
    const object = await getS3Object(key);
    if (!object.Body) return new Response(null, { status: 404 });

    const headers = new Headers({
      'Content-Type': object.ContentType ?? 'application/octet-stream',
      'Cache-Control': object.CacheControl ?? 'private, max-age=3600',
    });

    if (object.ContentLength) {
      headers.set('Content-Length', String(object.ContentLength));
    }

    return new Response(object.Body.transformToWebStream(), { headers });
  } catch {
    return new Response(null, { status: 404 });
  }
}
