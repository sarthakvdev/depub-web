import Link from "next/link";
import Button from "../components/Button";
import Input from "../components/Input";
import Container from '../components/wrappers/Container'

function SecondStep() {
  return (
    <Container className="overflow-y-hidden">
        <main className="gap-10 w-[30%] flex flex-col justify-around items-start">
            <div className="flex justify-between items-center w-full">
                <Link href="/firstStep">
                    <h4 className="text-xl">Go Back</h4>
                </Link>
                <Link href="/thirdStep">
                    <h4 className="text-xl font-bold underline">Step 3: Stake Matic</h4>
                </Link>
            </div>
            <h1 className="text-left text-4xl font-bold mb-6">
                Step 2: Add Poll
            </h1>
            <Input label="Question"/>
            <Input label="Option One(Correct)"/>
            <Input label="Option Two" />
            <Button text="Create Poll" className="bg-[#c1c1c1] w-full p-3 text-lg font-bold rounded-md" />
        </main>
    </Container>
  )
}

export default SecondStep