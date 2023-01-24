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
import { ethers } from 'ethers';

const PublishChapter = () => {
  const [published, setPublished] = useState(true);
  const [createBookLoading, setCreateBookLoading] = useState(false);
  const [createChapterLoading, setCreateChapterLoading] = useState(false);
  const router = useRouter();
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  const [chapterTitle, setChapterTitle] = useState('');
  const [content, setContent] = useState('');
  const [question, setQuestion] = useState('');
  const [authorChoice, setAuthorChoice] = useState(true);

  const { data: allBooksData } = useContractRead({
    ...CREATEACTORS_CONTRACT,
    functionName: 'getAllBooks',
  });

  const { data: allChaptersData } = useContractRead({
    ...STORY_CONTRACT,
    functionName: 'getAllChaptersOfBook',
  });

  // useEffect(() => {
  //   if (allBooksData) {
  //     const hex = allBooksData[0][1]._hex;
  //     console.log(parseInt(hex, 16));
  //   }
  // }, [allBooksData]);

  // CREATE BOOK SET OF HOOKS
  const { config: createBookConfig } = usePrepareContractWrite({
    ...CREATEACTORS_CONTRACT,
    functionName: 'createBook',
    args: ['Harry Potter'],
    onError: (error) => {
      console.error(error);
    },
  });

  const { data: createBookData, writeAsync: createBookAsync } =
    useContractWrite(createBookConfig);

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

  // CREATE CHAPTER SET OF HOOKS
  const { config: createChapterConfig } = usePrepareContractWrite({
    ...STORY_CONTRACT,
    functionName: 'createChapter',
    args: [
      0,
      'The Boy who lived',
      'This is the story of harry potter. He survives at the end of the chapter and his parents dies.',
      true,
    ],
    overrides: {
      from: address,
      value: ethers.utils.parseEther('0.01'),
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { data: createChapterData, writeAsync: createChapterAsync } =
    useContractWrite(createChapterConfig);

  // Function to create a chapter
  const createChapter = async () => {
    setCreateChapterLoading(true);
    try {
      const tx = await createChapterAsync?.();
      const res = tx?.wait();
      console.log('res', res);
      setCreateChapterLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setCreateChapterLoading(false);
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
        <div className="flex flex-col items-start w-full gap-4">
          <label htmlFor="input" className="font-bold">
            Book Name
          </label>
          <input
            type="text"
            name="input"
            placeholder="Harry Potter"
            className="w-full p-3 rounded-md border border-black"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-4">
          <label htmlFor="input" className="font-bold">
            Chapter Title
          </label>
          <input
            type="text"
            name="input"
            placeholder="The boy who lived"
            value={chapterTitle}
            onChange={(event) => setChapterTitle(event.target.value)}
            className="w-full p-3 rounded-md border border-black"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-4">
          <label htmlFor="input" className="font-bold">
            Chapter Content
          </label>
          <input
            type="text"
            name="input"
            placeholder="xyz"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="w-full p-3 rounded-md border border-black"
          />
        </div>
        {/* STEP 2 */}
        <h1 className="text-left text-4xl font-bold">
          Step 2: Add follow-up Question
        </h1>
        <Input label="Question" />
        <p className="-mt-8">in the next chapter?</p>
        <div className="flex flex-row gap-x-3">
          <label htmlFor="true">True</label>
          <input type="checkbox" id="true" />
        </div>
        <div className="flex flex-row gap-x-3">
          <label htmlFor="false">False</label>
          <input type="checkbox" id="false" />
        </div>
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
        <Button
          text="Create Chapter"
          onClick={createChapter}
          disabled={!createChapterAsync}
        />
        <Button
          text="All Chapters"
          onClick={() => console.log('chapters', allChaptersData)}
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
