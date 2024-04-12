"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Players } from "@/model/Player";

interface Props {
  t1Squad: string[];
  t2Squad: string[];
  team1Players: Players[];
  team2Players: Players[];
}

function YellowCards({ t1Squad, t2Squad, team1Players, team2Players }: Props) {
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { fields, append } = useFieldArray({
    name: "yellowCards",
    control,
  });

  const t1Players = team1Players.filter((player) => {
    return t1Squad.includes(player._id);
  });
  const t2Players = team2Players.filter((player) => {
    return t2Squad.includes(player._id);
  });
  const players = t1Players.concat(t2Players);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <input
          className="form-input focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
          {...register("goalsAgainstTeam1")}
        />
        <Button
          type="button"
          onClick={() => {
            const numFields = parseInt(getValues("goalsAgainstTeam1"), 10);
            for (let i = 0; i < numFields; i++) {
              append({ goal: "" });
            }
          }}>
          Add Goals
        </Button>
        {errors["goalsAgainstTeam1"] && (
          <span className="text-red-600 text-sm mt-0.5">
            {"This field is required"}
          </span>
        )}
      </div>
      <div className="mt-1 flex flex-col gap-2 rounded-md ">
        {fields.map((field, index) => (
          <div className="flex flex-col gap-1" key={field.id}>
            <p className="ml-0.5 text-xs text-gray-700">{`Goal ${
              index + 1
            }`}</p>
            <div className="flex flex-row w-full gap-2">
              <select
                {...register(`yellowCards.${index}.goal`)}
                className="shadow-sm form-input focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                <option disabled defaultChecked>
                  Choose player who scored the goal
                </option>
                {players.map((player, index) => (
                  <option value={player._id} key={index}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {errors["goalsAgainstTeam1"] && (
          <span className="text-red-600 text-sm mt-0.5">
            {"This field is required"}
          </span>
        )}
      </div>
    </div>
  );
}

export default YellowCards;
