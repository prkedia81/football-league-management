import Custom404 from "@/app/(home)/500";
import { cancelMatch } from "@/services/matches";

interface Props {
  params: { matchId: string };
}

export default async function page({ params: { matchId } }: Props) {
  const cancel = await cancelMatch(matchId);

  if (!cancel) return <Custom404 />;
  return (
    <>
      <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
              Success
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Match Cancelled
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Match Cancelled with 0-0 score
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <a
                  href="/admin"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Go back home
                </a>
                {/* <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Contact support
                </a> */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
