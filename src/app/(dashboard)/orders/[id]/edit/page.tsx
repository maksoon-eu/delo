type EditOrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditOrderPage(props: EditOrderPageProps) {
  const { params } = props;
  const { id } = await params;

  return <div>Edit Order {id}</div>;
}
