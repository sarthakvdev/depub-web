import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '../../../components/Button';
import Publication from '../../../components/Publication';
import FlexCol from '../../../components/wrappers/FlexCol';
import data from '../../../data/data.json';
import { useState } from 'react';
import { useSignMessage } from 'wagmi';
import clsx from 'clsx';

function Details() {
  const [staked, setStaked] = useState(false);
  const [stakedAmt, setStakedAmt] = useState(0);
  const [quiz, setQuiz] = useState(false);
  const [selectedOption, setSelectionOption] = useState(-1);
  const router = useRouter();
  const { title } = router.query;
  const id = parseInt(title as string);

  const question = data.publications[id].question;

  const {
    data: signData,
    isError,
    isLoading,
    isSuccess,
    signMessage,
  } = useSignMessage({
    message: `Staking ${stakedAmt} MATIC on ${
      selectedOption == 0 ? 'True' : 'False'
    }`,
  });

  return (
    <FlexCol>
      <FlexCol className="my-16 gap-6 w-1/3 flex flex-col justify-around items-start">
        <div className="flex items-center w-full">
          <Link href="/reader/explore">
            <h4 className="mb-4 text-xl">Go Back</h4>
          </Link>
        </div>
        {data.publications
          .filter((publication) => publication.id === id)
          .map((item, index) => (
            <Publication
              title={item.title}
              key={index}
              releaseDate={item.releaseDate}
              className="mb-8"
            />
          ))}
        {isSuccess ? (
          <h4 className="text-center mt-8 text-2xl font-bold">
            your vote has been registered!
            <br></br>
            <span
              onClick={() => router.push('/reader/explore')}
              className="cursor-pointer underline">
              {' '}
              go to explore page
            </span>
            <br></br>
            or{' '}
            <span
              className="underline cursor-pointer"
              onClick={() => router.push('/bounty')}>
              check bounty lock period
            </span>
          </h4>
        ) : quiz ? (
          !isLoading ? (
            <FlexCol className="w-full gap-6">
              <h4 className="text-xl font-bold mb-4">
                {question.questionTitle}
              </h4>
              <Button
                text={question.optionOne}
                onClick={() => setSelectionOption(0)}
                className={clsx(
                  'bg-transparent border border-black w-full p-3 text-lg font-bold rounded-md',
                  selectedOption == 0 && 'bg-purple-500 text-white'
                )}
              />
              <Button
                onClick={() => setSelectionOption(1)}
                text={question.optionTwo}
                className={clsx(
                  'bg-transparent border border-black w-full p-3 text-lg font-bold rounded-md',
                  selectedOption == 1 && 'bg-purple-500 text-white'
                )}
              />
              {/* Stake Amount */}
              <div className="flex flex-col justify-around items-start w-full gap-4">
                <label htmlFor="input" className="font-bold">
                  Enter Amount (in MATIC)
                </label>
                <input
                  type={'number'}
                  name="input"
                  placeholder={'0.001'}
                  onChange={(event) =>
                    setStakedAmt(parseFloat(event.target.value))
                  }
                  className={'w-full p-3 rounded-md border border-black'}
                />
              </div>
              <Button
                onClick={() => signMessage()}
                disabled={isLoading}
                text="Stake"
                className="border-none w-full p-3 text-lg font-bold rounded-md"
              />
            </FlexCol>
          ) : (
            <p>Loading...</p>
          )
        ) : (
          <FlexCol className="w-full gap-6 mb-20">
            <Button
              text="read"
              onClick={() => router.push(`${id}/read`)}
              // Write the flow how someone will read the chapter
              className="bg-[#c1c1c1] w-full p-3 text-lg font-bold rounded-md"
            />
            <Button
              onClick={() => setQuiz(!quiz)}
              text={'read + stake'}
              className="w-full p-3 text-lg font-bold rounded-md border border-[#747474]"
            />
          </FlexCol>
        )}
      </FlexCol>
    </FlexCol>
  );
}

export default Details;
