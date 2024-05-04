import MatchSheet from "@/components/home/MatchSheet";
import { Matches } from "@/model/Match";
import { getAllMatches } from "@/services/matches";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

async function page() {
  const matches = JSON.parse(
    JSON.stringify(await getAllMatches())
  ) as Matches[];

  return (
    <>
     <div  className="bg-gray-800 pt-2 sm:pt-10 lg:pt-8">
        <Navbar/>
        <h1 className="text-3xl text-center tracking-tight font-extrabold text-white sm:mt-1 sm:leading-none lg:mt-2 lg:text-2xl xl:text-2xl">
                  <span className="md:block">Matches</span>
        </h1>
      {matches.length === 0 && (
        <p className="text-center text-white">No matches as of yet, stay tuned!</p>
      )}
      
        {matches.map((match, i) => (
          <MatchSheet key={i} {...match} />
        ))}
     <Footer/>
    </div>
    </>
  );
}

export default page;
