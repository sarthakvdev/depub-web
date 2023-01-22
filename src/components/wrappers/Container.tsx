import clsx from 'clsx';
import { WrapperType } from 'utils/types';

const Container = ({ children, className }: WrapperType) => {
  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center h-[calc(100vh-149px)] sm:h-[calc(100vh-144px) w-screen',
        className
      )}>
      {children}
    </div>
  );
};

export default Container;
