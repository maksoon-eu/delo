export default function PublicOrderPage({ params }: { params: { token: string } }) {
  return <div>Public Order {params.token}</div>;
}
