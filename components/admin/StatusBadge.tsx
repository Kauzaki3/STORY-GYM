interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const s = status.toUpperCase();

  let badgeClass = "badge-pending";

  if (["ACTIVE", "PAID", "COMPLETED", "CONVERTED", "IN STOCK", "ATTENDED", "CONFIRMED"].includes(s)) {
    badgeClass = "badge-active";
  } else if (["INACTIVE", "CANCELLED", "EXPIRED", "OUT OF STOCK", "SUSPENDED", "FAILED"].includes(s)) {
    badgeClass = "badge-inactive";
  } else if (["NEW", "SHIPPED", "VISITED", "PROCESSING"].includes(s)) {
    badgeClass = "badge-new";
  } else if (["LOW STOCK", "CONTACTED", "PENDING"].includes(s)) {
    badgeClass = "badge-pending";
  }

  return (
    <span className={`inline-block ${badgeClass}`}>
      {status}
    </span>
  );
}
