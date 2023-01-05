import Link from "next/link";
import Input from "../components/Input";
import Publication from "../components/Publication";
import Container from '../components/wrappers/Container'
import FlexCol from "../components/wrappers/FlexCol";
import FlexRow from '../components/wrappers/FlexRow'

function FirstStep() {
  return (
    <Container className="overflow-y-hidden">
        <main className="gap-10 w-[30%] flex flex-col justify-around items-start">
            <div className="flex justify-between items-center w-full">
                <Link href="/dashboard">
                    <h4 className="text-xl">Go Back</h4>
                </Link>
                <Link href="/secondStep">
                    <h4 className="text-xl font-bold underline">Step 2: Add Poll</h4>
                </Link>
            </div>
            <h1 className="text-left text-4xl font-bold mb-6">
                Step 1: Chapter Details
            </h1>
            <Input label="Chapter Title"/>
            <Input label="Issue Number"/>
            <Input label="Chapter Content" className=" bg-[#c1c1c1]"/>
        </main>
        <Link href="/secondStep">
            <h4 className="mt-8 text-xl font-bold underline">Step 2:Add Poll</h4>
        </Link>
    </Container>
  )
}

export default FirstStep