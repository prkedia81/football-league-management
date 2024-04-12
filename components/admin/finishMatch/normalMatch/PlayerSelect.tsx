"use client";

import { Players } from "@/model/Player";
import { getAllPlayerDataFromTeamId } from "@/services/players";
import { useFormContext } from "react-hook-form";

interface Props {
  inputName: string;
  playerList: Players[];
}

export default function PlayerSelect({ inputName, playerList }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <fieldset>
      <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
        {playerList.map((player, index) => (
          <div key={index} className="relative flex items-start py-4">
            <div className="min-w-0 flex-1 text-sm w-full">
              <label
                htmlFor={player._id}
                className="font-medium text-gray-700 select-none w-full">
                {player.name}
              </label>
            </div>
            <div className="ml-3 flex items-center h-5">
              <input
                id={player._id}
                type="checkbox"
                {...register(inputName)}
                value={player._id}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
          </div>
        ))}
      </div>
      {errors[inputName]?.message && (
        <p className="mt-2 text-sm text-red-400">
          {"Select atleast 11 player"}
        </p>
      )}
    </fieldset>
  );
}
