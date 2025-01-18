import LandingLayout from '../layouts/landingLayout';
import changelog from '../../data/changelog.json';

const ChangelogPage = () => {
  return (
    <LandingLayout>
      <div className="container mx-auto p-6">
        <div className="bg-white dark:bg-stone-900 dark:text-stone-500 shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Changelog</h1>
          <p className="text-lg text-stone-500 mb-6">
            See what is new in the latest version of our app.
          </p>

          <hr className="mb-6" />

          {changelog.data.map((item: any, key: number) => (
            <div key={key} className="mb-8 grid grid-cols-4 gap-8">
              <div className="col-span-1 flex flex-col items-end gap-1 mb-4">
                <div className="rounded-full dark:bg-stone-800 px-3 py-1 text-xs font-medium ">
                  v{item.version}
                </div>
                <div className="text-sm text-muted-foreground">{item.date}</div>
              </div>
              <div className="col-span-3 space-y-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-stone-700">{item.description}</p>
                <div className="grid gap-2 text-muted-foreground list-disc pl-5">
                  {item.changes.map((change: string, key: number) => (
                    <div key={key} className="flex text-sm items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-stone-500" />
                      <span>{change}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
};

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
      strokeLinejoin="round"
      className="feather feather-check">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default ChangelogPage;
