import Button from 'components/Button';
import Input from 'components/Input';
import MetaHead from 'components/layout/MetaHead';
import Container from 'components/wrappers/Container';
import FlexCol from 'components/wrappers/FlexCol';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  CREATEACTORS_CONTRACT,
  SITE_DESCRIPTION,
  SITE_NAME,
} from 'utils/config';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useAccount,
} from 'wagmi';

const AuthorIndex: NextPage = () => {
  const router = useRouter();
  const [authorName, setAuthorName] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [createAuthorLoading, setCreateAuthorLoading] = useState(false);
  const { address } = useAccount();

  // Fetches list of all authors
  const { data: authorsData } = useContractRead({
    ...CREATEACTORS_CONTRACT,
    functionName: 'getAllAuthors',
  });

  // Prepares the Contract function call
  const { config } = usePrepareContractWrite({
    ...CREATEACTORS_CONTRACT,
    functionName: 'createAuthor',
    args: [authorName, authorBio],
    onError: (error) => {
      console.log(error);
    },
  });

  // Contract function call hook
  const { writeAsync: createAuthorAsync } = useContractWrite(config);

  // Function to call createAuthor in an Async-ly
  async function createAuthor() {
    setCreateAuthorLoading(true);
    try {
      const tx = await createAuthorAsync?.();
      const res = await tx?.wait();
      setCreateAuthorLoading(false);
      console.log('res', res);
    } catch (error) {
      console.error(error);
    } finally {
      setCreateAuthorLoading(false);
    }
  }

  function checkIfExists() {
    console.log('authors list', authorsData);
    const check = authorsData.filter((author: any) => author[3] == address);
    if (check.length > 0) {
      router.push('author/dashboard');
    } else {
      alert("Author doesn't exists, please register to move forward.");
    }
  }

  // useEffect(() => {
  //   if (address) {
  //     checkIfExists();
  //   }
  // }, [address]);

  return (
    <Container>
      <MetaHead title={SITE_NAME} description={SITE_DESCRIPTION} />
      <main className="w-1/3 flex justify-center items-center">
        <FlexCol className="gap-4">
          <p>
            If already registered,{' '}
            <Link href="/author/dashboard">
              <span className="underline">click here</span>
            </Link>
          </p>
          <h1 className="text-4xl font-bold text-center">Register Author.</h1>
          <form>
            <div className="flex flex-col items-start w-full gap-4">
              <label htmlFor="input" className="font-bold">
                Name
              </label>
              <input
                type="text"
                name="input"
                value={authorName}
                onChange={(event) => setAuthorName(event.target.value)}
                className="w-full p-3 rounded-md border border-black"
              />
            </div>
            <div className="flex flex-col mt-4 items-start w-full gap-4">
              <label htmlFor="input" className="font-bold">
                About Author
              </label>
              <input
                type="text"
                name="input"
                value={authorBio}
                onChange={(event) => setAuthorBio(event.target.value)}
                className="w-full p-3 rounded-md border border-black"
              />
            </div>
          </form>
          <div className="w-full p-2 gap-4 flex flex-col justify-around">
            <Button
              text={createAuthorLoading ? 'registring...' : 'register author'}
              onClick={() => {
                if (authorName.length > 0 && authorBio.length > 0) {
                  createAuthor();
                } else {
                  alert('Fill both Name and Bio');
                }
              }}
              disabled={!createAuthorAsync}
              className="p-2"
            />
            <Button text="check if registered" onClick={checkIfExists} />
          </div>
        </FlexCol>
      </main>
    </Container>
  );
};

export default AuthorIndex;
