import { useSearchParams } from "next/navigation";

export default function StartListingPage() {
  const params = useSearchParams();
  const plan = params.get("plan");

  return (
    <main style={{ padding: "80px", textAlign: "center" }}>
      <h1>Listing Submission</h1>
      <p>Selected plan: <strong>{plan}</strong></p>
      <p>Listing form coming next.</p>
    </main>
  );
}
