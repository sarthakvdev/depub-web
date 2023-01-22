import Link from 'next/link';
import Publication from '../components/Publication';
import FlexCol from '../components/wrappers/FlexCol';
import data from '../data/data.json';

const Explore = () => {
  return (
    <FlexCol className="my-20 gap-16">
      <h1 className="text-6xl mb-10 font-bold">Explore Publications</h1>
      <div className="flex flex-col items-start gap-y-10">
        {data.publications.map((publication) => (
          <Link href={{ pathname: `/${publication.title}` }}>
            <Publication
              title={publication.title}
              releaseDate={publication.releaseDate}
            />
          </Link>
        ))}
      </div>
    </FlexCol>
  );
};

export default Explore;
