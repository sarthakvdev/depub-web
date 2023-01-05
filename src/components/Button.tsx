
const Button = ({text, onClick, className}) => {
  return (
    <>
        <button className={`basis-1/2 rounded bg-[#C1C1C1] ${className}`} onClick={onClick}>{text}</button>
    </>
  )
}

export default Button