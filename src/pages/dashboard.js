import { useState } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Button from '../components/Button';
import Container from '../components/wrappers/Container';
import FlexCol from '../components/wrappers/FlexCol';
import FlexRow from '../components/wrappers/FlexRow';
import data from '../data/data.json';
import Publication from '../components/Publication';

function Dashboard() {
  const [author, setAuthor] = useState(false)
  const router = useRouter()
  return (
    <Container className="pt-12">
        {author ? (
            <Container className="pt-12">
                <FlexCol className="mt-20 gap-16">
                    <h1 className="text-6xl font-bold">
                        Welcome,
                        <span className="text-[#319AE5]"> 0xAc...456</span>
                    </h1>
                    <h3 className="text-4xl font-bold">My Chapters</h3>
                    <FlexRow className="gap-8">
                        <div 
                            onClick={() => router.push("/firstStep")}
                            className="w-40 h-48 flex justify-center items-center text-4xl font-bold border-4 rounded-lg border-dashed border-black cursor-pointer">
                            +
                        </div>
                        <h3 className="text-4xl font-bold">New Chapter</h3>
                    </FlexRow>
                    {data.publications.map((publication) => (
                        <Link href={{ pathname: `/${publication.title}`, query: publication }}>
                            <Publication
                                title={publication.title} 
                                releaseDate={publication.releaseDate} 
                            />
                        </Link>
                    ))}
                </FlexCol>

            </Container>
        ):(
            <FlexCol className="gap-4">
                <h1 className="mb-4 text-6xl font-bold">Author Dashboard</h1>
                <Button 
                    text="Connect Wallet"
                    onClick={() => setAuthor(true)}
                    className="px-4 py-2"
                 />
                 <h4 className="mt-4 text-3xl font-light cursor-pointer" onClick={() => router.push("/")}>Go Back</h4>
            </FlexCol>
        )}
    </Container>
  )
}

export default Dashboard