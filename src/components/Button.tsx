import clsx from 'clsx';

interface Props {
  text: string;
  onClick?: any;
  className?: string;
  disabled?: boolean;
}

const Button = ({ text, onClick, className, disabled = false }: Props) => {
  return (
    <button
      className={clsx(
        'basis-1/2 rounded bg-[#C1C1C1] hover:shadow-lg transition duration-200',
        className,
        disabled && 'hover:shadow-none'
      )}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
