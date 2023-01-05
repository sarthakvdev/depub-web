import MetaHead from 'components/layout/MetaHead';
import { SITE_DESCRIPTION, SITE_NAME } from 'utils/config';
import { useRouter } from 'next/router';
import Button from '../components/Button';
import Container from '../components/wrappers/Container';
import FlexCol from '../components/wrappers/FlexCol';
import data from '../data/data.json';

export default function Home() {
  const router = useRouter();
  return (
    <Container className="justify-around">
      <MetaHead title={SITE_NAME} description={SITE_DESCRIPTION} />

      <main className="mt-16 w-1/3 basis-4/5 flex justify-center items-center">
        <FlexCol className="gap-4">
          <h1 className="text-9xl font-bold text-center">DePub</h1>
          <h4 className="text-2xl font-normal text-center">
            Decentralised Publishing Platform
          </h4>

          <div className="w-full p-2 gap-4 flex flex-row justify-around">
            <Button
              text="for authors"
              onClick={() => router.push('/dashboard')}
              className="p-2"
            />
            <Button
              text="for readers"
              onClick={() => router.push('/explore')}
              className="p-2"
            />
          </div>
        </FlexCol>
      </main>
    </Container>
  );
}
