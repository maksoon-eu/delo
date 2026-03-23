// PDF download handler
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  return new Response(`Document ${params.id} — not implemented`);
}
