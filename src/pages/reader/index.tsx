import Button from 'components/Button';
import Input from 'components/Input';
import MetaHead from 'components/layout/MetaHead';
import Container from 'components/wrappers/Container';
import FlexCol from 'components/wrappers/FlexCol';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  CREATEACTORS_CONTRACT,
  SITE_DESCRIPTION,
  SITE_NAME,
} from 'utils/config';
import {
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
} from 'wagmi';

const Reader: NextPage = () => {
  const router = useRouter();
  const [readerName, setReaderName] = useState('');
  const [readerBio, setReaderBio] = useState('');
  const [createReaderLoading, setCreateReaderLoading] = useState(false);
  const { address } = useAccount();

  // Fetches list of all readers
  const { data: readersData } = useContractRead({
    ...CREATEACTORS_CONTRACT,
    functionName: 'getAllReaders',
  });

  // Prepares the Contract function call
  const { config } = usePrepareContractWrite({
    ...CREATEACTORS_CONTRACT,
    functionName: 'createReader',
    args: [readerName, readerBio],
    onError: (error) => {
      console.log(error);
    },
  });

  // Contract function call hook
  const { writeAsync: createReaderAsync } = useContractWrite(config);

  // Function to call createReader in an Async-ly
  async function createReader() {
    setCreateReaderLoading(true);
    try {
      const tx = await createReaderAsync?.();
      const res = await tx?.wait();
      setCreateReaderLoading(false);
      console.log('res', res);
    } catch (error) {
      console.error(error);
    } finally {
      setCreateReaderLoading(false);
    }
  }

  function checkIfExists() {
    const check = readersData.filter((reader: any) => reader[2] == address);
    if (check.length > 0) {
      router.push('reader/explore');
    } else {
      alert("reader doesn't exists, hence register!");
    }
  }

  // useEffect(() => {
  //   checkIfExists();
  // }, []);

  return (
    <Container>
      <MetaHead title={SITE_NAME} description={SITE_DESCRIPTION} />
      <main className="w-1/3 flex justify-center items-center">
        <FlexCol className="gap-4">
          <h1 className="text-4xl font-bold text-center">Register Reader.</h1>
          <form>
            <div className="flex flex-col items-start w-full gap-4">
              <label htmlFor="input" className="font-bold">
                Name
              </label>
              <input
                type="text"
                name="input"
                value={readerName}
                onChange={(event) => setReaderName(event.target.value)}
                className="w-full p-3 rounded-md border border-black"
              />
            </div>
            <div className="flex flex-col items-start w-full gap-4">
              <label htmlFor="input" className="font-bold">
                About Reader
              </label>
              <input
                type="text"
                name="input"
                value={readerBio}
                onChange={(event) => setReaderBio(event.target.value)}
                className="w-full p-3 rounded-md border border-black"
              />
            </div>
          </form>
          <div className="w-full p-2 gap-4 flex flex-col justify-around">
            <Button
              text={createReaderLoading ? 'registring...' : 'registration user'}
              onClick={() => {
                if (readerName.length > 0 && readerBio.length > 0) {
                  createReader();
                } else {
                  alert('Fill both Name and Bio');
                }
              }}
              disabled={!createReaderAsync}
              className="p-2"
            />
            <Button text="check if registered" onClick={checkIfExists} />
          </div>
        </FlexCol>
      </main>
    </Container>
  );
};

export default Reader;
