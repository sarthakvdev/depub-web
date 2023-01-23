interface Props {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

const Input = ({ label, type = 'text', placeholder, className }: Props) => {
  return (
    <div className="flex flex-col justify-around items-start w-full gap-4">
      <label htmlFor="input" className="font-bold">
        {label}
      </label>
      <input
        type={type}
        name="input"
        placeholder={placeholder}
        className={`w-full p-3 rounded-md border border-black ${className}`}
      />
    </div>
  );
};

export default Input;
