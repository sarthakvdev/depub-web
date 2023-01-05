import React from 'react'
import Container from './wrappers/Container'

const Input = ({label, className}) => {
  return (
    <div className="flex flex-col justify-around items-start w-full gap-4">
        <label for="input" className="font-bold">{label}</label>
        <input type="text" name="input" className={`w-full p-3 rounded-md border border-black ${className}`}/>
    </div>
  )
}

export default Input