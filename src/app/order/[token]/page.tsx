type PublicOrderPageProps = {
  params: Promise<{ token: string }>;
};

export default async function PublicOrderPage(props: PublicOrderPageProps) {
  const { params } = props;
  const { token } = await params;

  return <div>Public Order {token}</div>;
}
