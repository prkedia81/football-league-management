'use client'
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
//if we are using the same Logic for yellow card and red cards then it can be reused/modified later
export default function scoreLogic() {
 const router = useRouter();

 const { register, handleSubmit, formState: { errors } } = useForm();

 const onSubmit = (data) => {
    if (data.goals === 0) {
      router.push("/yellowCard");
    } else {
      router.push("/goalScorer");
    }
 };

 return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center space-x-2">
      Enter Goals Scored for East Bengal
      </div>
      <label htmlFor="goals" className="block text-sm font-medium mb-2">
        Number of goals
      </label>
      <input
        type="number"
        id="goals"
        placeholder="Enter the number of goals"
        {...register("goals", { required: true, valueAsNumber: true })}
        className="block w-full appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      />
      {errors.goals && <p>Please enter the number of goals.</p>}
      <Button type="submit">Submit</Button>
    </form>
 );
}
