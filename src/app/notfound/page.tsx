export default function NotFound() {
  return (
    <main className="grid place-items-center min-h-[90dvh] bg-card-background px-6">
      <div className="text-center">
        <p className="text-base font-semibold text-elements-primary-main">
          404
        </p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-text-primary sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-text-dimmed sm:text-xl/8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-elements-primary-main px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-elements-primary-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elements-primary-main"
          >
            Go back home
          </a>
        </div>
      </div>
    </main>
  );
}
