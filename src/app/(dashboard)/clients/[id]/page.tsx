type ClientPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ClientPage(props: ClientPageProps) {
  const { params } = props;
  const { id } = await params;

  return <div>Client {id}</div>;
}
