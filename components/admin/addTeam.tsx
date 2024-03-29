import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function AddTeam() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add Team</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                  Team Name
                </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
            </div>
            <div className="flex flex-col space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
            </div>
            <label className="block text-sm font-medium text-gray-700">
                  Item
                </label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-200 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Reset</Button>
        <Button>Upload</Button>
      </CardFooter>
    </Card>
  )
}
export default AddTeam