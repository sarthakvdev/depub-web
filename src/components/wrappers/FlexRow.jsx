
const FlexRow = ({children, className}) => {
  return (
    <div className={`flex flex-row items-center justify-around ${className}`}>
        {children}
    </div>
  )
}

export default FlexRow