export default function SubmitListingPage() {
  return (
    <main style={{ maxWidth: "1200px", margin: "60px auto", padding: "0 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
        Submit Your Business Listing
      </h1>
      <p style={{ textAlign: "center", marginBottom: "40px", color: "#555" }}>
        Choose a plan to get started. You can upgrade anytime.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Starter */}
        <div style={{ border: "1px solid #ddd", padding: "24px", borderRadius: "8px" }}>
          <h3>Starter</h3>
          <h2>Free</h2>
          <p>10-day listing</p>
          <ul>
            <li>Basic business profile</li>
            <li>Contact information</li>
            <li>Location on map</li>
            <li>Up to 3 photos</li>
            <li>Business hours</li>
          </ul>
          <a href="/submit-listing/start?plan=starter">
            <button>Get Started</button>
          </a>
        </div>

        {/* Professional */}
        <div
          style={{
            border: "2px solid #2563eb",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          <h3>Professional</h3>
          <h2>$10.50</h2>
          <p>20-day listing</p>
          <ul>
            <li>Enhanced business profile</li>
            <li>Priority placement</li>
            <li>Up to 8 photos</li>
            <li>Video showcase</li>
            <li>Website & social links</li>
          </ul>
          <a href="/submit-listing/start?plan=professional">
            <button>Select Plan</button>
          </a>
        </div>

        {/* Premium */}
        <div style={{ border: "1px solid #ddd", padding: "24px", borderRadius: "8px" }}>
          <h3>Premium</h3>
          <h2>$31.50</h2>
          <p>60-day listing</p>
          <ul>
            <li>Featured badge</li>
            <li>Top of category placement</li>
            <li>Unlimited photos</li>
            <li>Video showcase</li>
            <li>Priority support</li>
          </ul>
          <a href="/submit-listing/start?plan=premium">
            <button>Select Plan</button>
          </a>
        </div>
      </div>
    </main>
  );
}
