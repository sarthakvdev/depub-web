import clsx from 'clsx';

interface Props {
	text: string;
	onClick?: any;
	className?: string;
}

const Button = ({ text, onClick, className }: Props) => {
	return (
		<button
			className={clsx('basis-1/2 rounded bg-[#C1C1C1]', className)}
			onClick={onClick}>
			{text}
		</button>
	);
};

export default Button;
