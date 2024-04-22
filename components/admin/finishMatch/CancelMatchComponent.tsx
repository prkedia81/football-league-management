import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

interface Props {
  matchId: string;
}

const CancelMatchComponent = ({ matchId }: Props) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className="flex flex-col justify-left w-full ">
            <Card className="cursor-pointer border border-gray-200">
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-bold leading-none">
                    Match Cancelled
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-left text-gray-500 dark:text-gray-400">
                  The match got cancelled with no winners or losers.
                </p>
              </CardContent>
            </Card>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              If you cancel the match, the match will end with a 0-0 score. You
              have the option of cancelling the match or re-scheduling it to
              another day. Choose whichever is applicable.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Link href={"/admin/match/reschedule/" + matchId}>
              <Button variant="outline">Re-schedule Match</Button>
            </Link>
            <Link href={"/admin/match/cancel/" + matchId}>
              <Button>Cancel Match</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CancelMatchComponent;
