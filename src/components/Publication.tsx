import clsx from 'clsx';
import FlexRow from './wrappers/FlexRow';

interface Props {
  title: string;
  releaseDate: string;
  className?: string;
}

const Publication = ({ title, releaseDate, className }: Props) => {
  return (
    <FlexRow
      className={clsx(
        'gap-8 py-2 pl-2 pr-6 bg-gray-50 shadow-sm hover:shadow-md rounded-lg transition duration-200',
        className
      )}>
      <div className="w-40 h-48 bg-[#C1C1C1] flex justify-center items-center border-none rounded-lg" />
      <div className="flex flex-col justify-between items-start text-left gap-4">
        <h3 className="text-left text-4xl font-bold">{title}</h3>
        <h4 className="text-left text-2xl font-bold">{releaseDate}</h4>
      </div>
    </FlexRow>
  );
};

export default Publication;
