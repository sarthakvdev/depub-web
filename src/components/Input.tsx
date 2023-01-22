interface Props {
  label: string;
  className?: string;
}

const Input = ({ label, className }: Props) => {
  return (
    <div className="flex flex-col justify-around items-start w-full gap-4">
      <label htmlFor="input" className="font-bold">
        {label}
      </label>
      <input
        type="text"
        name="input"
        className={`w-full p-3 rounded-md border border-black ${className}`}
      />
    </div>
  );
};

export default Input;
