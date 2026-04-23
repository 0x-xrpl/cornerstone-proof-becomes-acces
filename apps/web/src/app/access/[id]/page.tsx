import { AccessLiveDetail } from "@/features/access/access-live-detail";

export default function AccessDetailPage({
  params
}: {
  params: { id: string };
}) {
  return <AccessLiveDetail accessId={params.id} />;
}
