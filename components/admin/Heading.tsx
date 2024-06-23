import Link from "next/link";
import { Button } from "../ui/button";

interface Props {
  heading: string;
  isPrimaryButton?: boolean;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  isSecondaryButton?: boolean;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function PageHeading({
  heading,
  isPrimaryButton = false,
  primaryButtonLink = "/admin",
  primaryButtonText = "Home",
  isSecondaryButton = false,
  secondaryButtonLink = "/admin",
  secondaryButtonText = "Back",
}: Props) {
  return (
    <div className="px-6 pt-3 pb-3 flex border-b gap-2 items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          {heading}
        </h2>
      </div>
      {(isPrimaryButton || isSecondaryButton) && (
        <div className="flex flex-row gap-2 md:ml-4">
          {isSecondaryButton && (
            <Link href={secondaryButtonLink}>
              <Button variant="outline">{secondaryButtonText}</Button>
            </Link>
          )}
          {isPrimaryButton && (
            <Link href={primaryButtonLink}>
              <Button variant="default">{primaryButtonText}</Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
