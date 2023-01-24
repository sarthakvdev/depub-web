import Button from 'components/Button';
import FlexCol from 'components/wrappers/FlexCol';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import Input from '../../components/Input';
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from 'wagmi';
import { CREATEACTORS_CONTRACT, STORY_CONTRACT } from 'utils/config';

const PublishChapter = () => {
  const [published, setPublished] = useState(true);
  const [createBookLoading, setCreateBookLoading] = useState(false);
  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  const { data: allBooksData } = useContractRead({
    ...CREATEACTORS_CONTRACT,
    functionName: 'getAllBooks',
  });

  const { config } = usePrepareContractWrite({
    ...CREATEACTORS_CONTRACT,
    functionName: 'createBook',
    args: ['Harry Potter'],
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    console.log('All Books', allBooksData);
  }, [allBooksData]);

  const { data: createBookData, writeAsync: createBookAsync } =
    useContractWrite(config);

  // Function to create a book
  const createBook = async () => {
    setCreateBookLoading(true);
    try {
      const tx = await createBookAsync?.();
      const res = tx?.wait();
      setCreateBookLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setCreateBookLoading(false);
    }
  };

  return (
    <FlexCol className="my-16">
      <main className="gap-10 w-2/5 flex flex-col justify-around items-start">
        <div className="text-left w-full">
          <Link href="/author/dashboard">
            <h4 className="text-xl">Go Back</h4>
          </Link>
        </div>
        {/* STEP 1 */}
        <h1 className="text-left text-4xl font-bold">
          Step 1: Chapter Details
        </h1>
        <Input label="Book's Title" />
        <Input label="Chapter Title" />
        <Input label="Chapter Content" />
        {/* STEP 2 */}
        <h1 className="text-left text-4xl font-bold">
          Step 2: Add follow-up Question
        </h1>
        <Input label="Question" />
        <p className="-mt-8">in the next chapter?</p>
        <Input label="Option One(Correct)" />
        <Input label="Option Two" />
        {/* STEP 3 */}
        <h1 className="text-left text-4xl font-bold">
          Step 3: Your skin in the game to incentivize feedback
        </h1>
        <h3 className="text-2xl font-bold">
          Current Balance: {balance?.formatted.slice(0, 5)} {balance?.symbol}
        </h3>
        <Input label="Enter Amount (in MATIC)" type="number" />
        <Button
          text="Stake"
          className="bg-[#c1c1c1] w-full p-3 text-lg font-bold rounded-md"
        />
        <Button
          text={
            createBookLoading ? 'Creating boook...' : 'Create Harry Potter Book'
          }
          onClick={createBook}
          disabled={!createBookAsync}
        />
        <Button
          text="All books"
          onClick={() => console.log('books', allBooksData)}
        />
      </main>
      {published && (
        <h4 className="mt-8 text-2xl font-bold">
          your chapter has been published!
          <span
            onClick={() => router.push('/author/dashboard')}
            className="cursor-pointer underline">
            {' '}
            go to dashboard
          </span>
        </h4>
      )}
    </FlexCol>
  );
};

export default PublishChapter;
