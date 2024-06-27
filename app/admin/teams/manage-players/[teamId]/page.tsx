// "use client"
import Custom404 from "@/app/admin/500";
import LoadingState from "@/app/loading";
import EmptyState from "@/components/admin/EmptyState";
import PageHeading from "@/components/admin/Heading";
import PlayerTable from "@/components/admin/PlayerTable";
import { getAllPlayerDataFromTeamId } from "@/services/players";
import { getTeamFromId } from "@/services/teams";
import { useState, Suspense, useEffect } from "react";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Props {
  params: { teamId: string };
}

const SearchBox = () => {
  return (
    <>  
    <form className="max-w-md mx-auto space-y-4">
      <div className="flex items-center border-b border-gray-300 pb-2">
        <Input 
          type="search" 
          id="default-search" 
          className="w-full py-2 px-4 border-transparent rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 focus:outline-none focus:ring-gray-100 focus:border-slate-500" 
          placeholder="Player Name or ID" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          required 
        />
      <Button type="submit" >
        Search
      </Button>
      </div>
    </form>
    </>
  )
  }

  //used useState to store the data and searchQuery
  // const [data1, setData]= useState<Boolean>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  let [copyPlayerList, setPlayerList] = useState<any[]>([]);


  export default async function page({ params: { teamId } }: Props) {
  const team = await getTeamFromId(teamId);
  const playerList = await getAllPlayerDataFromTeamId(teamId);
  copyPlayerList = [...playerList]; //used to store the copy of playerList
  if (team === null) return <Custom404 />;

  //this function matches the db data as per the search query
  const handleSearch = (query : string) => {
    // let filteredData = data1;
    //   if(searchQuery) {
    //   filteredData = data1.filter(playerList => playerList.name.toLowerCase().includes(searchQuery.toLowerCase()) || playerList.regId.toLowerCase().includes(searchQuery.toLowerCase()));
    //   setData(filteredData);

    if (!playerList.length) return; // Ensure playerList is not empty

    const filteredData:any = copyPlayerList.filter(player =>
      player.name.toLowerCase().includes(query.toLowerCase()) ||
      player.regId.toLowerCase().includes(query.toLowerCase())
    );
    setPlayerList(filteredData);
  };
  //useEffect to call the handleSearch function: manages handle search with searchQuery
  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, copyPlayerList]);

  return (
    <>
      <Suspense fallback={<LoadingState />}>
      <div style={{position: 'sticky', top: 0}}>
        <PageHeading
          heading={team.name + " - " + "Player List"}
          isPrimaryButton={true}
          primaryButtonLink={
            "/admin/teams/manage-players/" + teamId + "/add-players"
          }
          primaryButtonText="Add Players"
        />
       <SearchBox /> 
        {playerList.length === 0 && (
          <EmptyState
            text="No players added, click here to add players"
            link={"/admin/teams/manage-players/" + teamId + "/add-players"}
          />
        )}
        </div>
        {playerList.length !== 0 && (
          <PlayerTable
            data={playerList}
            caption={"Table of players in " + team.name}
          />
        )}
      </Suspense>
    </>
  );
}
