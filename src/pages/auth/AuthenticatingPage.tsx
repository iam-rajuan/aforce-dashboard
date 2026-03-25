export function AuthenticatingPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-auth text-center">
      <div>
        <div className="mx-auto mb-8 h-16 w-16 animate-spin rounded-full border-2 border-neon/20 border-t-neon" />
        <h1 className="text-4xl font-bold text-white">Authenticating...</h1>
        <p className="mt-2 text-text-muted">Verifying your administrative credentials and securing your session.</p>
        <p className="mt-8 inline-flex rounded-full border border-neon/20 bg-neon/10 px-4 py-2 text-neon">Secure Channel Active</p>
      </div>
    </div>
  )
}
