'use client'

import React from 'react'
import CancelModal from "@/components/admin/CardComponent/CancelModal";
import NormalMatchForm from "@/components/admin/finishMatch/MultiForm";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import Match, { Matches } from "@/model/Match";
import { Players } from "@/model/Player";
import { Teams } from "@/model/Team";
import { getMatchFromId } from "@/services/matches";
import { getAllPlayerDataFromTeamId } from "@/services/players";
import { getTeamFromId } from "@/services/teams";
import { ClockIcon, WifiIcon } from "@heroicons/react/24/outline";
import { CodeIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react"

const CardComponent = () => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
     setShowModal(true);
    }
  return (
    <>
    <div className="flex flex-col justify-left w-full ">
        {/* <Link href="#">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center gap-2">
                <div className="text-sm font-bold leading-none">
                  Normal Match
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The match ended without any hiccups
              </p>
            </CardContent>
          </Card>
        </Link> */}
        <button onClick={handleOpenModal} >
        <Card className="border border-gray-200">
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              {/* <ClockIcon className="h-6 w-6" /> */}
              <div className="text-sm font-bold leading-none">
                Match Cancelled
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The match got cancelled with no winners or losers.
            </p>
          </CardContent>
        </Card>
        </button>
        {showModal && <CancelModal onClose={() => setShowModal(false)} />}
        {/*TODO: Connect Cancel match to db*/} 
      </div>
    </>
  )
}

export default CardComponent