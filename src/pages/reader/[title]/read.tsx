import Container from 'components/wrappers/Container';
import FlexCol from 'components/wrappers/FlexCol';
import Link from 'next/link';
import { useRouter } from 'next/router';
import data from '../../../data/data.json';

const ReadChapter = () => {
  const router = useRouter();
  const { title } = router.query;

  const chapter = data.publications[parseInt(title as string)];
  return (
    <div className="flex flex-col h-screen items-center">
      <FlexCol className="max-w-xl text-left gap-y-10 mt-10">
        <div className="flex items-center w-full">
          <Link href={`/reader/${title}`}>
            <h4 className="mb-4 text-xl">Go Back</h4>
          </Link>
        </div>
        <p className="text-4xl font-bold">{chapter.title}</p>
        <div>{chapter.content}</div>
      </FlexCol>
    </div>
  );
};

export default ReadChapter;
