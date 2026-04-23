import { KeyLiveDetail } from "@/features/keys/key-live-detail";

export default function KeyDetailPage({
  params
}: {
  params: { id: string };
}) {
  return <KeyLiveDetail keyId={params.id} />;
}
