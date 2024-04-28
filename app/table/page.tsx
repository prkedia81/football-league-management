import Footer from '@/components/footer/Footer'
import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import { GetServerSideProps } from 'next';
import { leagueTable } from '@/services/leagueTable';

interface TeamProps {
  rank: number;
  regId: string;
  name: string;
  teamCode: string;
  matches: number;
  points: number;
  wins: number;
  losses: number;
  draws: number;
  goalDifference: number;
  goalsFor: number;
  goalsAgainst: number;
 }
 
 interface LeagueTableProps {
  teams: TeamProps[];
 }

export const getServerSideProps: GetServerSideProps = async () => {
 const data = await leagueTable([]); // Assuming you pass an empty array or your actual data here
 return {
    props: {
      teams: data,
    },
 };
};


const Table: React.FC<LeagueTableProps> = ({ teams }) => {
  return (
    <>
    <div className='bg-gray-800 pt-4 sm:pt-10 lg:pt-12'>
    <Navbar/>
    </div>
    <div className='bg-gray-400'>
    <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                  <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Pos
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Team
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Shorthand
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Points
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      M
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
                      W
                    </th>
                    <th  scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      L
                    </th>
                    <th  scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      D
                    </th>
                    <th  scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      GD
                    </th>
                    <th  scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      GF
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      GA
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {teams.map((team, index) => (
                <tr key={index}>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.rank}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.teamCode}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.points}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.matches}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.wins}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.losses}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.draws}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.goalDifference}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.goalsFor}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.goalsAgainst}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                 </td>
               </tr>
                 ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      </div>
    </>
  )
}

export default Table