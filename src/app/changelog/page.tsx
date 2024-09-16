import LandingLayout from '../layouts/landingLayout';

export default function Component() {
  return (
    <LandingLayout>
      <div className="w-full max-w-4xl mb-96 mx-auto py-12 md:py-16">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold">Changelog</h2>
            <p className="text-muted-foreground">
              See what is new in the latest version of our app.
            </p>
          </div>
          <div className="h-8" />
          <div className="grid grid-cols-[100px_1fr] items-start gap-4 md:gap-8">
            <div className="flex flex-col items-end gap-1">
              <div className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                v0.1
              </div>
              <div className="text-sm text-muted-foreground">Sept 16, 2024</div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Initial MVP Release</h3>
              <p>
                The first version of our app, featuring the core functionality.
                Including:
              </p>
              <ul className="grid gap-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4" />
                  Intuitive user interface
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4" />
                  Comprehensive drafting + projects
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4" />
                  Basic Resources + Calendar
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
