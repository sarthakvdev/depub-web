import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '../components/Button';
import Publication from '../components/Publication';
import Container from '../components/wrappers/Container';
import FlexCol from '../components/wrappers/FlexCol';
import data from '../data/data.json';
import { useState } from 'react';
import Input from '../components/Input';

function Details() {
  const [staked, setStaked] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const router = useRouter();
  const { title } = router.query;

  return (
    <FlexCol>
      <FlexCol className="my-16 gap-6 w-1/3 flex flex-col justify-around items-start">
        <div className="flex items-center w-full">
          <Link href="/explore">
            <h4 className="mb-4 text-xl">Go Back</h4>
          </Link>
        </div>
        {data.publications
          .filter((publication) => publication.title === title)
          .map((item) => (
            <Publication
              title={item.title}
              releaseDate={item.releaseDate}
              className="mb-8"
            />
          ))}
        {staked ? (
          <h4 className="text-center mt-8 text-2xl font-bold">
            your vote has been registered!
            <br></br>
            <span
              onClick={() => router.push('/explore')}
              className="cursor-pointer underline">
              {' '}
              go to explore page
            </span>
          </h4>
        ) : quiz ? (
          <FlexCol className="w-full gap-6">
            <h4 className="text-xl font-bold mb-4">Who will Simran marry?</h4>
            <Button
              text="Raj"
              className="bg-transparent border border-black w-full p-3 text-lg font-bold rounded-md"
            />
            <Button
              onClick={() => router.push('/quiz')}
              text="Rajesh"
              className="bg-transparent border border-black w-full p-3 text-lg font-bold rounded-md"
            />
            <Input label="Enter Amount" />
            <Button
              onClick={() => setStaked(true)}
              text="Stake"
              className="border-none w-full p-3 text-lg font-bold rounded-md"
            />
          </FlexCol>
        ) : (
          <FlexCol className="w-full gap-6 mb-20">
            <Button
              text="read"
              // Write the flow how someone will read the chapter
              className="bg-[#c1c1c1] w-full p-3 text-lg font-bold rounded-md"
              disabled={true}
            />
            <Button
              onClick={() => setQuiz(!quiz)}
              text="read + stake"
              className="w-full p-3 text-lg font-bold rounded-md border border-[#747474]"
            />
          </FlexCol>
        )}
      </FlexCol>
    </FlexCol>
  );
}

export default Details;
