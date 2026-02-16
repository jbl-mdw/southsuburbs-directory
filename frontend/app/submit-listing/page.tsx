export const dynamic = "force-dynamic";
export const revalidate = 0;


import SubmitListingForm from "./submit-form";

export default function SubmitListingPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const raw = searchParams?.plan;
  const plan = Array.isArray(raw) ? raw[0] : raw || "free";
  return <SubmitListingForm plan={plan} />;
}
