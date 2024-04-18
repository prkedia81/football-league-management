import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
    number: z.number().min(0).max(12).refine(value => value >= 0 && value <= 12, {
       message: 'Number must be between 0 and 12',
    }),
   });

const PointDeduction: React.FC = () => {
    const { control, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
     });
  return (
    <div className="flex flex-col gap-4">
        <Label htmlFor="number">Enter Points to be deducted</Label>
        <Controller
          name="number"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} id="number" placeholder="Enter the points to be deducted (0-12)" />
          )}
        />
        {errors.number?.message && (
        <p className="mt-2 text-sm text-red-400">{"Select Deduction Point Between 0-12"}</p>
      )}
    </div>
  )
}

export default PointDeduction