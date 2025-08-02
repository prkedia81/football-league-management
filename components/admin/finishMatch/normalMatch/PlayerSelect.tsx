"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Players } from "@/model/Player";
import { useFormContext } from "react-hook-form";

interface Props {
  starting11Field: string;
  substituteField: string;
  captainField: string;
  gkField: string;
  reserveField: string;
  playerList: Players[];
}

export default function PlayerSelect({ playerList, ...props }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const headings = [
    "Player Name",
    "Starting XI",
    "Played as Substitute",
    "Captain",
    "Goal Keeper",
    "In Reserve Bench",
  ];

  return (
    <>
      <div>
        {errors[props.starting11Field]?.message && (
          <p className="mt-0.5 text-base text-red-600">
            {errors[props.starting11Field]?.message as string}
          </p>
        )}
        {errors[props.gkField]?.message && (
          <p className="mt-0.5 text-base text-red-600">
            {errors[props.gkField]?.message as string}
          </p>
        )}
        {errors[props.captainField]?.message && (
          <p className="mt-0.5 text-base text-red-600">
            {errors[props.captainField]?.message as string}
          </p>
        )}
        {errors[props.substituteField]?.message && (
          <p className="mt-0.5 text-base text-red-600">
            {errors[props.substituteField]?.message as string}
          </p>
        )}
        {errors[props.reserveField]?.message && (
          <p className="mt-0.5 text-base text-red-600">
            {errors[props.reserveField]?.message as string}
          </p>
        )}
        {/* <ScrollArea className="w-full h-[400px] border"> */}
        <Table className="relative border w-full">
          <TableCaption>Select the player list</TableCaption>
          <TableHeader className="sticky top-0 z-50 bg-white border">
            <TableRow>
              {headings.map((heading, i) => (
                <TableHead key={i} className="w-[100px] text-center border">
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {playerList.map((player, index) => (
              <TableRow key={index} className="text-center">
                <TableCell className="text-left border">
                  {player.name + " - " + player.regId}
                </TableCell>
                <TableCell className="border">
                  <input
                    id={props.starting11Field + "." + player._id}
                    type="checkbox"
                    {...register(props.starting11Field)}
                    value={player._id as string}
                    className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-500 rounded"
                  />
                </TableCell>
                <TableCell className="border">
                  <input
                    id={props.substituteField + "." + player._id}
                    type="checkbox"
                    {...register(props.substituteField)}
                    value={player._id as string}
                    className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-500 rounded"
                  />
                </TableCell>
                <TableCell className="border">
                  <input
                    id={props.captainField + "." + player._id}
                    type="checkbox"
                    {...register(props.captainField)}
                    value={player._id as string}
                    className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-500 rounded"
                  />
                </TableCell>
                <TableCell className="border">
                  <input
                    id={props.gkField + "." + player._id}
                    type="checkbox"
                    {...register(props.gkField)}
                    value={player._id as string}
                    className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-500 rounded"
                  />
                </TableCell>
                <TableCell className="border">
                  <input
                    id={props.reserveField + "." + player._id}
                    type="checkbox"
                    {...register(props.reserveField)}
                    value={player._id as string}
                    className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-500 rounded"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* </ScrollArea> */}
      </div>
    </>
  );
}
