// Templates remount on every navigation, so this replays a subtle
// entrance animation for each page. CSS-only — no JS cost.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-up">{children}</div>;
}
