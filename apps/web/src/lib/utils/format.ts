export function formatDate(value: string | null) {
  if (!value) return "Not yet earned";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatCountdown(target: string | null) {
  if (!target) return "No limit";

  const diffMs = new Date(target).getTime() - Date.now();

  if (diffMs <= 0) return "Expired";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m left`;
}
