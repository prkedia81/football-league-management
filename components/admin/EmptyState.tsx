import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { ReactNode } from "react";

interface Props {
  link: string;
  text: string;
  //   icon: ReactNode;
}

function EmptyState({ link, text }: Props) {
  return (
    <a
      href={link}
      className="mx-4 my-6 relative block w-[95%] border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <PlusCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
      <span className="mt-2 block text-sm font-medium text-gray-900">
        {text}
      </span>
    </a>
  );
}

export default EmptyState;
