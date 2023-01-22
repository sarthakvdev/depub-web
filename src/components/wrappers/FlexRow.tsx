import { WrapperType } from 'utils/types';

const FlexRow = ({ children, className }: WrapperType) => {
  return (
    <div className={`flex flex-row items-center justify-around ${className}`}>
      {children}
    </div>
  );
};

export default FlexRow;
