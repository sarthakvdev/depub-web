import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import FlexCol from '../../components/wrappers/FlexCol';
import FlexRow from '../../components/wrappers/FlexRow';
import data from '../../data/data.json';
import Publication from '../../components/Publication';
import { useAccount, useContractRead } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import Container from 'components/wrappers/Container';
import { CREATEACTORS_CONTRACT } from 'utils/config';

const Dashboard = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [author, setAuthor] = useState('');
  const router = useRouter();

  // Fetches list of all authors
  const { data: authorsData } = useContractRead({
    ...CREATEACTORS_CONTRACT,
    functionName: 'getAllAuthors',
  });

  // useEffect(() => {
  //   console.log('isConnecting', isConnecting);
  //   console.log('isDisconnected', isDisconnected);
  //   console.log('address', address);
  // }, [isConnecting, isDisconnected, address]);

  useEffect(() => {
    console.log('address', address);
    const temp = authorsData.filter((author: any) => author[3] == address);
    setAuthor(temp[0][0]);
  }, [authorsData]);

  return (
    <FlexCol>
      {address ? (
        // Wallet is connected
        <FlexCol className="my-12 gap-12">
          <h1 className="text-6xl font-bold">
            Welcome,
            <span className="text-[#319AE5]">
              {' '}
              {author.length > 0 ? (
                <span>{author}</span>
              ) : (
                <span>
                  {address.slice(0, 4)}...{address.slice(-4)}
                </span>
              )}
            </span>
          </h1>
          <h3 className="text-4xl font-bold">My Chapters</h3>
          <FlexRow className="gap-8 border rounded-lg p-6">
            <div
              onClick={() => router.push('/author/firstStep')}
              className="w-40 h-48 flex justify-center items-center text-4xl font-bold border-4 rounded-lg border-dashed border-black cursor-pointer">
              +
            </div>
            <h3 className="text-4xl font-bold">New Chapter</h3>
          </FlexRow>
          {data.publications.map((publication) => (
            <Link
              href={{
                pathname: `/${publication.title}`,
                query: publication,
              }}>
              <Publication
                title={publication.title}
                releaseDate={publication.releaseDate}
              />
            </Link>
          ))}
        </FlexCol>
      ) : (
        // Wallet is not connected
        <Container className="gap-4">
          <h1 className="mb-4 text-6xl font-bold">Author Dashboard</h1>
          <ConnectKitButton />
          <h4
            className="mt-4 text-3xl font-light cursor-pointer"
            onClick={() => router.push('/')}>
            Go Back
          </h4>
        </Container>
      )}
    </FlexCol>
  );
};

export default Dashboard;
