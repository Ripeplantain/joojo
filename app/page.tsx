import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-6 text-[var(--main-text)] sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl flex-col justify-center">
        <div className="panel max-w-2xl">
          <p className="section-kicker">
            <span>joojo</span>
          </p>
          <h1 className="mt-8 font-display text-5xl font-bold leading-tight text-[var(--navy-900)] sm:text-6xl">
            Learn clearly. Grow confidently.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-[var(--muted-text)]">
            A learning platform for students mastering technology.
          </p>
          <div className="mt-10">
            <Link className="button-sample button-primary" href="/design-system">
              View Design System
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
