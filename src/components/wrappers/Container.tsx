import { WrapperType } from 'utils/types';

const Container = ({ children, className }: WrapperType) => {
  return (
    <div
      className={`w-screen min-h-screen flex flex-col justify-center items-center ${className}`}>
      {children}
    </div>
  );
};

export default Container;
