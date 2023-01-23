import { ReactNode, FC, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import NetworkStatus from './NetworkStatus';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = (props) => {
  const { isDisconnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isDisconnected) {
      router.push('/');
    }
  }, [isDisconnected]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="text-center">{props.children}</div>
      <div className="fixed bottom-1 right-1">
        <NetworkStatus />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
