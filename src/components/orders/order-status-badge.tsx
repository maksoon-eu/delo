type OrderStatusBadgeProps = {
  status: string;
};

export function OrderStatusBadge(props: OrderStatusBadgeProps) {
  const { status } = props;

  return <span>{status}</span>;
}
