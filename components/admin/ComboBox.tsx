import { useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Combobox } from "@headlessui/react";
import { cn } from "@/lib/utils";

export interface ComboBoxElement {
  value: string;
  label: string;
  sublabel?: string;
}

interface Props {
  onChange: (...event: any[]) => void;
  value: any;
  placeholderText: string;
  disabledText?: string;
  items: ComboBoxElement[];
}

export function ComboBox({
  onChange,
  value,
  placeholderText,
  items,
  ...props
}: Props) {
  const [query, setQuery] = useState("");

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          return item.label.toLowerCase().includes(query.toLowerCase());
        });
  // TODO: Highlight Selected

  return (
    <Combobox as="div" value={value} onChange={(e) => onChange(e.value)}>
      <div className="relative mt-1">
        <Combobox.Button className="w-full">
          <Combobox.Input
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(sel) => {
              if (!sel) return "";
              const i = items.filter((item) => item.value == sel);
              return i[0].label;
            }}
            placeholder={placeholderText}
          />
          <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </Combobox.Button>

        {filteredItems.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {props.disabledText && (
              <Combobox.Option
                value="disabled"
                className="text-gray-400 relative cursor-default select-none py-2 pl-3 pr-9"
                disabled>
                {props.disabledText}
              </Combobox.Option>
            )}
            {filteredItems.map((item) => (
              <Combobox.Option
                key={item.value}
                value={item}
                className={({ active }) =>
                  cn(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }>
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={cn(
                          "truncate",
                          selected ? "font-semibold" : ""
                        )}>
                        {item.label}
                      </span>
                      {item.sublabel && (
                        <span
                          className={cn(
                            "ml-2 truncate text-gray-500",
                            active ? "text-indigo-200" : "text-gray-500"
                          )}>
                          {item.sublabel}
                        </span>
                      )}
                    </div>

                    {selected && (
                      <span
                        className={cn(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}>
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
