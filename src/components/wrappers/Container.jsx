import React from 'react'

const Container = ({children, className}) => {
  return (
    <div className={`w-screen min-h-screen flex flex-col justify-center items-center ${className}`}>
        {children}
    </div>
  )
}

export default Container