"use client";

import { Players } from "@/model/Player";
import { useFormContext } from "react-hook-form";

interface Props {
  filterId?: string[];
  inputName: string;
  playerList: Players[];
}

export default function PlayerSelect({
  inputName,
  playerList,
  filterId,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (filterId) {
    playerList = playerList.filter((player) => {
      return filterId.includes(player._id);
    });
  }

  return (
    <fieldset>
      <div className="border-b border-gray-200 divide-y divide-gray-200">
        {playerList.map((player, index) => (
          <div key={index} className="relative flex py-4">
            <div className="min-w-0 w-fit flex-1 text-sm">
              <label
                htmlFor={player._id}
                className="cursor-pointer font-medium text-gray-700">
                {player.name}
              </label>
            </div>
            <div className="ml-3 flex">
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
          {errors[inputName]?.message as string}
        </p>
      )}
    </fieldset>
  );
}
