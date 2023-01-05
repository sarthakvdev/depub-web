const Container = ({ children, className }: any) => {
  return (
    <div
      className={`w-screen min-h-screen flex flex-col justify-center items-center ${className}`}>
      {children}
    </div>
  );
};

export default Container;
