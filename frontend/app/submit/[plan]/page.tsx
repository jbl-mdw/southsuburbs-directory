export const dynamic = "force-dynamic";
export const revalidate = 0;

import SubmitListingForm from "../SubmitListingForm";

type Plan = "starter" | "professional" | "premium";

function normalize(plan: string): Plan {
  const p = (plan || "").toLowerCase();
  if (p === "starter" || p === "professional" || p === "premium") return p;
  return "starter";
}

export default function SubmitPlanPage({ params }: { params: { plan: string } }) {
  const plan = normalize(params.plan);
  return <SubmitListingForm plan={plan} />;
}
