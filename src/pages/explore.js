import Link from "next/link"
import Publication from "../components/Publication"
import Container from '../components/wrappers/Container'
import FlexCol from "../components/wrappers/FlexCol"
import data from '../data/data.json'

function Explore() {
  return (
    <Container className="pt-12">
        <FlexCol className="mt-20 gap-16">
            <h1 className="text-6xl font-bold">
                Explore Publications
            </h1>
            {data.publications.map((publication) => (
                <Link href={{ pathname: `/${publication.title}` }}>
                    <Publication
                        title={publication.title} 
                        releaseDate={publication.releaseDate} 
                    />
                </Link>
            ))}
        </FlexCol>

    </Container>
  )
}

export default Explore