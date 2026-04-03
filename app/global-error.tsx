"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F2E9",
          color: "#2D2926",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "400px", padding: "24px" }}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              marginBottom: "16px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Terjadi Kesalahan
          </h1>
          <p
            style={{
              color: "#5E5954",
              marginBottom: "24px",
              lineHeight: 1.6,
            }}
          >
            Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: "#7D6B3D",
              color: "#F5F2E9",
              border: "none",
              padding: "12px 32px",
              borderRadius: "12px",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  );
}
