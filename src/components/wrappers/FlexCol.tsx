import { WrapperType } from 'utils/types';

const FlexCol = ({ children, className }: WrapperType) => {
  return (
    <div className={`flex flex-col items-center justify-around ${className}`}>
      {children}
    </div>
  );
};

export default FlexCol;
