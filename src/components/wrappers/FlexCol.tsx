
const FlexCol = ({children, className}) => {
    return (
      <div className={`flex flex-col items-center justify-around ${className}`}>
          {children}
      </div>
    )
  }
  
  export default FlexCol