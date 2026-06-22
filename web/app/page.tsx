export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F2EBE1] flex flex-col items-center justify-center gap-6 px-6">
      <h1 className="font-display italic text-5xl text-[#1A1A1A]">passio</h1>
      <p className="text-[#6B6B6B] text-center max-w-xs">
        A beautiful home for Indian fashion creators.
      </p>
      <a
        href="/demo-brand"
        className="text-sm text-[#B8956A] underline underline-offset-4"
      >
        View demo →
      </a>
    </main>
  )
}
