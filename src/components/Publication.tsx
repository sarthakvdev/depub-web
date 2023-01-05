import React from 'react'
import FlexCol from './wrappers/FlexCol'
import FlexRow from './wrappers/FlexRow'

const Publication = ({title, releaseDate, className}) => {
  return (
    <FlexRow className={`gap-8 ${className}`}>
        <div className="w-40 h-48 bg-[#C1C1C1] flex justify-center items-center border-none rounded-lg" />
        <div className="flex flex-col justify-between items-start text-left gap-4">
            <h3 className="text-left text-4xl font-bold">{title}</h3>
            <h4 className="text-left text-2xl font-bold">{releaseDate}</h4>
        </div>
    </FlexRow>
  )
}

export default Publication