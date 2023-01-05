import Link from "next/link";
import {useRouter} from "next/router"
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Container from '../components/wrappers/Container'

function ThirdStep() {
  const [publish, setPublish] = useState(false);
  const router = useRouter();
  return (
    <Container className="overflow-y-hidden">
        <main className="gap-10 w-[30%] flex flex-col justify-around items-start">
            <div className="flex justify-between items-center w-full">
                <Link href="/secondStep">
                    <h4 className="text-xl">Go Back</h4>
                </Link>
                <h4 onClick={() => setPublish(!publish)} className="text-xl font-bold underline">Publish Your Story</h4>
            </div>
            <h1 className="text-left text-4xl font-bold mb-6">
                Step 3: Stake MATIC
            </h1>
            <h3 className="text-2xl font-bold">Current Balance: 1300 MATIC</h3>
            <Input label="Enter Amount"/>
            <Button text="Stake" className="bg-[#c1c1c1] w-full p-3 text-lg font-bold rounded-md" />
            {publish && (
                <h4 className="mt-8 text-2xl font-bold">
                    your chapter has been published!
                    <span onClick={() => router.push("/dashboard")} className="cursor-pointer underline"> go to dashboard
                    </span>
                </h4>
            )}
        </main>
    </Container>
  )
}

export default ThirdStep