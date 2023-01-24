import { useRouter } from 'next/router';
import Link from 'next/link';
import Button from '../../../components/Button';
import Publication from '../../../components/Publication';
import FlexCol from '../../../components/wrappers/FlexCol';
import data from '../../../data/data.json';

function Details() {
  const router = useRouter();
  const { title } = router.query;
  const id = parseInt(title as string);

  return (
    <FlexCol>
      <FlexCol className="my-16 gap-6 w-1/3 flex flex-col justify-around items-start">
        <div className="flex items-center w-full">
          <Link href="/author/dashboard">
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
        <FlexCol className="w-full gap-6 mb-20">
          <Button
            text="read"
            onClick={() => router.push(`${id}/read`)}
            // Write the flow how someone will read the chapter
            className="bg-[#c1c1c1] w-full p-3 text-lg font-bold rounded-md"
          />
        </FlexCol>
      </FlexCol>
    </FlexCol>
  );
}

export default Details;
