import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
//made a generic one if it is t0 be used in multiple places
const SearchBox = () => {
  return (
    <>  
    <form className="max-w-md mx-auto space-y-4">
      <div className="flex items-center border-b border-gray-300 pb-2">
        <Input 
          type="search" 
          id="default-search" 
          className="w-full py-2 px-4 border-transparent rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 focus:outline-none focus:ring-gray-100 focus:border-slate-500" 
          placeholder="Player Name or ID" 
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          required 
        />
      <Button type="submit" >
        Search
      </Button>
      </div>
    </form>
    </>
  )
}

export default SearchBox