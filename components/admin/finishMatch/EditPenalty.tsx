"use client";

import { PenaltyEditSchema } from "@/lib/finishMatchSchema";
import { PenaltyEditInputs } from "@/lib/matchFormTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import PointDeduction from "./walkover/PointDeduction";
import { Matches } from "@/model/Match";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  match: Matches;
  winner: number;
}

function EditPenalty({ match, winner }: Props) {
  const [losingTeam, setLosingTeam] = useState<string>("");
  const [losingTeamId, setLosingTeamId] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const router = useRouter();
  const methods = useForm<PenaltyEditInputs>({
    resolver: zodResolver(PenaltyEditSchema),
  });
  useEffect(() => {
    if (winner === 1) {
      setLosingTeam(match.team2.teamName || "");
      setLosingTeamId(match.team2.teamId || "");
    } else if (winner === 2) {
      setLosingTeam(match.team1.teamName || "");
      setLosingTeamId(match.team1.teamId || "");
    }
  }, []);

  const processForm: SubmitHandler<PenaltyEditInputs> = async (data) => {
    setIsDialogOpen(true);
  };

  const editPenalty = async () => {
    const resp = await axios.post("/api/admin/edit-penalty", {
      matchId: match._id,
      deduction: methods.getValues("deduction"),
      losingTeamId: losingTeamId,
    });
    router.push("/admin");
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="py-12 px-12 flex flex-col gap-6"
          onSubmit={methods.handleSubmit(processForm)}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <h2 className="text-base font-semibold text-gray-900">
                Select Penalty for {losingTeam}
              </h2>
              <p className="text-sm text-gray-600">
                Select the new penalty to be deducted from {losingTeam}
              </p>
            </div>
            <PointDeduction />
          </div>
          <div>
            <Button type="submit">Edit Penalty</Button>
          </div>
        </form>
      </FormProvider>
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              By clicking confirm you are changing the penalty to -
              {methods.getValues("deduction")}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={editPenalty}>Confirm Edit Penalty</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EditPenalty;
